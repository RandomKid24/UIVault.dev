import { AvatarUpload } from '@/components/ui/avatar-upload';

export default function AvatarUploadDemo() {
  return <AvatarUpload name="Aarav Mehta" onChange={(f) => console.log(f)} />;
}
