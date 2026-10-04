import { Avatar, AvatarGroup } from '@/components/ui/avatar';

export default function AvatarDemo() {
  return (
    <div className="grid gap-5">
      <div className="flex items-center gap-3">
        <Avatar name="Aarav Mehta" size="xs" />
        <Avatar name="Diya Rao" size="sm" />
        <Avatar name="Kabir Shah" size="md" />
        <Avatar name="Meera Iyer" size="lg" />
      </div>
      <AvatarGroup names={['Aarav Mehta', 'Diya Rao', 'Kabir Shah', 'Meera Iyer', 'Rohan Das', 'Isha Nair']} max={4} />
    </div>
  );
}
