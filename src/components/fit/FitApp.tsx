import { useCallback, useMemo, useRef, useState } from "react";
import { Download, ImagePlus, Loader2, Lock, Unlock, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdUnit } from "@/components/ads/AdUnit";
import { PreviewStage } from "./PreviewStage";
import { CropMark } from "./CropMark";
import { ASPECTS, PRESETS, sizeFromAspect } from "@/lib/fit/presets";
import { inspectFile, WARN_FILE_BYTES } from "@/lib/fit/magic";
import { clampEdge, decodeBitmap, isLossy, resizeImage, resolveOutput } from "@/lib/fit/resize";
import { zipBlobs } from "@/lib/zip";
import { downloadBlob, formatBytes, yieldToMain } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { FitItem, Mode, OutputChoice, PadColor } from "@/lib/fit/types";

type Stage = "idle" | "ready" | "working" | "done";

const ACCEPT = "image/jpeg,image/png,image/webp,image/bmp,image/gif,.jpg,.jpeg,.png,.webp,.bmp,.gif";

const MODES: { id: Mode; label: string; hint: string }[] = [
  { id: "fill", label: "Fill", hint: "Cover + center crop" },
  { id: "fit", label: "Fit", hint: "Contain + pad" },
  { id: "stretch", label: "Stretch", hint: "Distort to frame" },
];

const OUTPUTS: { id: OutputChoice; label: string }[] = [
  { id: "keep", label: "Keep" },
  { id: "image/jpeg", label: "JPG" },
  { id: "image/png", label: "PNG" },
  { id: "image/webp", label: "WebP" },
];

export function FitApp() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<FitItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [presetId, setPresetId] = useState<string>("ig-post");
  const [width, setWidth] = useState(1080);
  const [height, setHeight] = useState(1080);
  const [lockAspect, setLockAspect] = useState(false);
  const [mode, setMode] = useState<Mode>("fill");
  const [pad, setPad] = useState<PadColor>("#000000");
  const [output, setOutput] = useState<OutputChoice>("keep");
  const [quality, setQuality] = useState(0.92);
  const [dragOver, setDragOver] = useState(false);
  const [banner, setBanner] = useState<string | null>(null);

  const selected = items.find((i) => i.id === selectedId) ?? items[0] ?? null;
  const ratio = width / Math.max(1, height);
  const lossyPreview = selected ? isLossy(resolveOutput(selected.file, output)) : output !== "image/png";

  const addFiles = useCallback(async (list: FileList | File[]) => {
    const warnings: string[] = [];
    const next: FitItem[] = [];
    for (const file of Array.from(list)) {
      const id = `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`;
      const inspected = await inspectFile(file);
      if (!inspected.ok) {
        next.push({
          id,
          file,
          preview: "",
          error: inspected.error,
          progress: 0,
        });
        continue;
      }
      const warn = file.size > WARN_FILE_BYTES ? `${file.name} is large (${formatBytes(file.size)}). Resize may be slow on this device.` : undefined;
      if (warn) warnings.push(warn);
      const preview = URL.createObjectURL(file);
      let origW: number | undefined;
      let origH: number | undefined;
      let error: string | undefined;
      try {
        const bmp = await decodeBitmap(file);
        origW = bmp.width;
        origH = bmp.height;
        bmp.close();
      } catch (err) {
        error = err instanceof Error ? err.message : "Could not read this image.";
      }
      next.push({ id, file, preview, origW, origH, error, warn, progress: 0 });
    }
    setBanner(warnings.length ? warnings.join(" ") : null);
    setItems((prev) => {
      const merged = [...prev, ...next];
      setStage(merged.some((i) => !i.error) ? "ready" : merged.length ? "ready" : "idle");
      return merged;
    });
    setSelectedId((cur) => cur ?? next.find((i) => !i.error)?.id ?? next[0]?.id ?? null);
  }, []);

  function remove(id: string) {
    setItems((prev) => {
      const item = prev.find((p) => p.id === id);
      if (item) {
        if (item.preview) URL.revokeObjectURL(item.preview);
        if (item.result) URL.revokeObjectURL(item.result.url);
      }
      const rest = prev.filter((p) => p.id !== id);
      if (!rest.length) {
        setStage("idle");
        setSelectedId(null);
      } else if (selectedId === id) {
        setSelectedId(rest[0]?.id ?? null);
      }
      return rest;
    });
  }

  function clearAll() {
    items.forEach((item) => {
      if (item.preview) URL.revokeObjectURL(item.preview);
      if (item.result) URL.revokeObjectURL(item.result.url);
    });
    setItems([]);
    setSelectedId(null);
    setStage("idle");
    setBanner(null);
  }

  function applyPreset(id: string) {
    const preset = PRESETS.find((p) => p.id === id);
    if (!preset) return;
    setPresetId(id);
    setWidth(preset.width);
    setHeight(preset.height);
  }

  function onWidth(raw: string) {
    const n = clampEdge(Number(raw.replace(/[^\d]/g, "") || "1"));
    setPresetId("custom");
    setWidth(n);
    if (lockAspect) setHeight(clampEdge(n / ratio));
  }

  function onHeight(raw: string) {
    const n = clampEdge(Number(raw.replace(/[^\d]/g, "") || "1"));
    setPresetId("custom");
    setHeight(n);
    if (lockAspect) setWidth(clampEdge(n * ratio));
  }

  function applyAspect(id: string) {
    const shortcut = ASPECTS.find((a) => a.id === id);
    if (!shortcut) return;
    setPresetId("custom");
    if (shortcut.ratio === "original") {
      if (selected?.origW && selected.origH) {
        setWidth(clampEdge(selected.origW));
        setHeight(clampEdge(selected.origH));
      }
      return;
    }
    const next = sizeFromAspect(shortcut.ratio, width, height);
    setWidth(next.width);
    setHeight(next.height);
  }

  async function runResize() {
    const work = items.filter((i) => !i.error);
    if (!work.length) return;
    setStage("working");
    const opts = { width, height, mode, pad, output, quality };
    const next = [...items];
    for (let i = 0; i < next.length; i++) {
      const item = next[i];
      if (!item || item.error) continue;
      next[i] = { ...item, progress: 15 };
      setItems([...next]);
      await yieldToMain();
      try {
        const result = await resizeImage(item.file, item.origW ?? 0, item.origH ?? 0, opts);
        if (item.result) URL.revokeObjectURL(item.result.url);
        next[i] = {
          ...item,
          progress: 100,
          result: { ...result, url: URL.createObjectURL(result.blob) },
        };
      } catch (err) {
        next[i] = {
          ...item,
          progress: 0,
          error: err instanceof Error ? err.message : "Could not resize this image.",
        };
      }
      setItems([...next]);
    }
    setStage("done");
  }

  async function downloadZip() {
    const files = items.filter((i) => i.result).map((i) => ({ name: i.result!.filename, blob: i.result!.blob }));
    if (!files.length) return;
    const blob = await zipBlobs(files);
    await downloadBlob(blob, `fit-${files.length}-images.zip`);
  }

  const overall = items.length ? Math.round(items.reduce((s, i) => s + i.progress, 0) / items.length) : 0;
  const doneCount = useMemo(() => items.filter((i) => i.result).length, [items]);
  const readyCount = items.filter((i) => !i.error).length;

  return (
    <div>
      <section
        className={cn(
          "rounded-lg border border-dashed bg-surface p-6 text-center transition-[border-color,background-color] duration-150 sm:p-8",
          dragOver ? "border-accent bg-elevated" : "border-line",
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files.length) void addFiles(e.dataTransfer.files);
        }}
      >
        <div className="mx-auto flex size-12 items-center justify-center rounded-md border border-line bg-elevated">
          <ImagePlus className="size-5 text-accent" />
        </div>
        <h2 className="mt-4 font-display text-xl">Drop images on the frame</h2>
        <p className="mt-1 text-sm text-muted">JPG, PNG, WebP, BMP, GIF. HEIC is rejected — convert in HEIC Local first.</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button type="button" onClick={() => inputRef.current?.click()}>
            Choose files
          </Button>
          {items.length > 0 && (
            <Button type="button" variant="outline" onClick={clearAll}>
              Clear all
            </Button>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          multiple
          className="sr-only"
          onChange={(e) => {
            if (e.target.files?.length) void addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </section>

      {banner && <p className="mt-3 text-sm text-warn">{banner}</p>}

      {items.length > 0 && (
        <ul className="mt-4 space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <div
                className={cn(
                  "flex w-full items-center gap-3 rounded-md border bg-surface p-2 text-left transition-colors",
                  selected?.id === item.id ? "border-accent" : "border-line",
                )}
              >
                <button
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className="flex min-w-0 flex-1 items-center gap-3 text-left"
                >
                  {item.preview ? (
                    <img src={item.preview} alt="" className="size-14 rounded-sm bg-elevated object-cover" />
                  ) : (
                    <span className="flex size-14 items-center justify-center rounded-sm bg-elevated">
                      <CropMark size={16} />
                    </span>
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{item.file.name}</span>
                    <span className="block font-mono text-[11px] tabular-nums text-muted">
                      {item.origW && item.origH ? `${item.origW}×${item.origH}` : "—"} · {formatBytes(item.file.size)}
                    </span>
                    {item.error && <span className="block text-xs text-danger">{item.error}</span>}
                  </span>
                </button>
                <button
                  type="button"
                  aria-label="Remove"
                  className="inline-flex size-11 shrink-0 items-center justify-center text-muted hover:text-fg"
                  onClick={() => remove(item.id)}
                >
                  <X className="size-4" />
                </button>
              </div>
              {stage === "working" && (
                <div className="mt-1 h-1 overflow-hidden rounded-sm bg-line">
                  <div className="h-full bg-accent" style={{ width: `${item.progress}%` }} />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <PreviewStage item={selected} width={width} height={height} mode={mode} pad={pad} />

        <section className="rounded-lg border border-line bg-surface p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Target</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset.id)}
                className={cn(
                  "min-h-11 rounded-md px-3 text-left text-sm leading-tight",
                  presetId === preset.id ? "bg-accent text-on-accent" : "border border-line bg-elevated text-fg hover:border-accent/50",
                )}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-[1fr_auto_1fr_auto] items-end gap-2">
            <label className="text-sm">
              Width
              <input
                inputMode="numeric"
                value={width}
                onChange={(e) => onWidth(e.target.value)}
                className="mt-1 h-11 w-full rounded-md border border-line bg-bg px-3 font-mono tabular-nums"
                aria-label="Width in pixels"
              />
            </label>
            <span className="mb-3 font-mono text-muted">×</span>
            <label className="text-sm">
              Height
              <input
                inputMode="numeric"
                value={height}
                onChange={(e) => onHeight(e.target.value)}
                className="mt-1 h-11 w-full rounded-md border border-line bg-bg px-3 font-mono tabular-nums"
                aria-label="Height in pixels"
              />
            </label>
            <button
              type="button"
              className="mb-0 inline-flex size-11 items-center justify-center rounded-md border border-line bg-elevated"
              onClick={() => setLockAspect((v) => !v)}
              aria-pressed={lockAspect}
              aria-label={lockAspect ? "Unlock aspect ratio" : "Lock aspect ratio"}
            >
              {lockAspect ? <Lock className="size-4 text-accent" /> : <Unlock className="size-4 text-muted" />}
            </button>
          </div>
          <p className="mt-1 text-[11px] text-muted">Max edge 8192. Lock keeps the current ratio.</p>

          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Aspect</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {ASPECTS.map((aspect) => (
              <button
                key={aspect.id}
                type="button"
                onClick={() => applyAspect(aspect.id)}
                className="min-h-11 rounded-md border border-line bg-bg px-3 font-mono text-sm hover:border-accent/50"
              >
                {aspect.label}
              </button>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-4 rounded-lg border border-line bg-surface p-4">
        <div className="grid gap-5 sm:grid-cols-2">
          <fieldset>
            <legend className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Mode</legend>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {MODES.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMode(m.id)}
                  className={cn(
                    "min-h-11 rounded-md px-2 py-2 text-center",
                    mode === m.id ? "bg-accent text-on-accent" : "border border-line bg-elevated",
                  )}
                >
                  <span className="block text-sm font-semibold">{m.label}</span>
                  <span className={cn("block text-[10px]", mode === m.id ? "text-on-accent/80" : "text-muted")}>{m.hint}</span>
                </button>
              ))}
            </div>
            {mode === "fit" && (
              <div className="mt-3 flex gap-2">
                {(["#000000", "#ffffff"] as const).map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setPad(color)}
                    className={cn(
                      "min-h-11 flex-1 rounded-md border px-3 text-sm",
                      pad === color ? "border-accent" : "border-line",
                    )}
                  >
                    Pad {color === "#000000" ? "black" : "white"}
                  </button>
                ))}
              </div>
            )}
          </fieldset>

          <fieldset>
            <legend className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Output</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {OUTPUTS.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setOutput(o.id)}
                  className={cn(
                    "min-h-11 rounded-md px-3 text-sm font-semibold",
                    output === o.id ? "bg-accent text-on-accent" : "border border-line bg-elevated",
                  )}
                >
                  {o.label}
                </button>
              ))}
            </div>
            {lossyPreview && (
              <label className="mt-3 block text-sm">
                <span className="flex justify-between">
                  Quality <span className="font-mono tabular-nums text-muted">{quality.toFixed(2)}</span>
                </span>
                <input
                  type="range"
                  min={0.7}
                  max={1}
                  step={0.01}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="mt-2 w-full accent-accent"
                />
              </label>
            )}
          </fieldset>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button
            type="button"
            data-testid="resize-cta"
            onClick={() => void runResize()}
            disabled={!readyCount || stage === "working"}
            aria-busy={stage === "working"}
            className="min-h-11"
          >
            {stage === "working" ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Resizing…
              </>
            ) : (
              `Resize${readyCount ? ` ${readyCount}` : ""}`
            )}
          </Button>
          {stage === "working" && <span className="font-mono text-sm tabular-nums text-muted">{overall}%</span>}
        </div>
      </section>

      {stage === "done" && doneCount > 0 && (
        <section className="mt-4 rounded-lg border border-line bg-elevated p-4">
          <p className="font-display text-xl">
            {doneCount} {doneCount === 1 ? "image" : "images"} resized to {width}×{height}
          </p>
          <ul className="mt-3 space-y-2">
            {items
              .filter((i) => i.result)
              .map((item) => (
                <li key={item.id} className="flex flex-col gap-2 rounded-md border border-line bg-surface p-3 sm:flex-row sm:items-center">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{item.result!.filename}</p>
                    <p className="font-mono text-xs tabular-nums text-muted">
                      {item.result!.origW}×{item.result!.origH} → {item.result!.width}×{item.result!.height} ·{" "}
                      {formatBytes(item.result!.originalSize)} → {formatBytes(item.result!.newSize)}
                      {item.result!.upscaled ? " · Upscaled" : ""}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => void downloadBlob(item.result!.blob, item.result!.filename)}
                  >
                    <Download className="size-4" /> Download
                  </Button>
                </li>
              ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button type="button" onClick={() => void downloadZip()}>
              <Download className="size-4" /> Download ZIP
            </Button>
            <Button type="button" variant="outline" onClick={clearAll}>
              <Trash2 className="size-4" /> Start over
            </Button>
          </div>
          <AdUnit slot="after-success" />
        </section>
      )}
    </div>
  );
}
