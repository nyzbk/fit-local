import JSZip from "jszip";

export async function zipBlobs(files: { name: string; blob: Blob }[]): Promise<Blob> {
  const zip = new JSZip();
  const used = new Map<string, number>();
  for (const file of files) {
    const count = used.get(file.name) ?? 0;
    used.set(file.name, count + 1);
    const name = count === 0 ? file.name : file.name.replace(/(\.[^.]+)$/, `-${count}$1`);
    zip.file(name, file.blob);
  }
  return zip.generateAsync({ type: "blob" });
}
