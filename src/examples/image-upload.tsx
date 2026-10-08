import * as React from 'react';
import { ImageUpload } from '@/components/ui/image-upload';

export default function ImageUploadDemo() {
  const [files, setFiles] = React.useState<File[]>([]);
  return <ImageUpload className="w-full max-w-md" files={files} onFilesChange={setFiles} max={6} />;
}
