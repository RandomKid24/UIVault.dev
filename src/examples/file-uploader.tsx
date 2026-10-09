import { FileUploader } from '@/components/ui/file-uploader';

/** Fake upload: ticks to 100% over a couple of seconds. Files named "fail" error out so you can try Retry. */
const fakeUpload = (file: File, onProgress: (p: number) => void, signal: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    let p = 0;
    const id = setInterval(() => {
      p += 8 + Math.random() * 12;
      if (file.name.toLowerCase().includes('fail') && p > 55) { clearInterval(id); return reject(new Error('Server rejected the file.')); }
      onProgress(Math.min(p, 100));
      if (p >= 100) { clearInterval(id); resolve(); }
    }, 250);
    signal.addEventListener('abort', () => { clearInterval(id); reject(new DOMException('Aborted', 'AbortError')); });
  });

export default function FileUploaderDemo() {
  return <FileUploader className="w-full max-w-md" upload={fakeUpload} />;
}
