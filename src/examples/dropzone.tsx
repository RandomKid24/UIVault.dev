import * as React from 'react';
import { Dropzone } from '@/components/ui/dropzone';

export default function DropzoneDemo() {
  const [files, setFiles] = React.useState<File[]>([]);
  return <Dropzone className="w-full max-w-md" files={files} onFilesChange={setFiles} />;
}
