import { Avatar, AvatarGroup, UserInfo } from '@/components/ui/avatar';

const team = ['Aarav Mehta', 'Diya Rao', 'Kabir Shah', 'Meera Iyer', 'Rohan Das', 'Isha Nair', 'Vikram Joshi'];

export default function AvatarDemo() {
  return (
    <div className="grid justify-items-start gap-6">
      <div className="flex items-end gap-3">
        <Avatar name="Aarav Mehta" size="xs" />
        <Avatar name="Diya Rao" size="sm" />
        <Avatar name="Kabir Shah" size="md" />
        <Avatar name="Meera Iyer" size="lg" />
        <Avatar name="Rohan Das" size="xl" />
      </div>
      <div className="flex items-center gap-4">
        <Avatar name="Aarav Mehta" size="md" status="online" />
        <Avatar name="Diya Rao" size="md" status="away" />
        <Avatar name="Kabir Shah" size="md" status="busy" />
        <Avatar name="Meera Iyer" size="md" status="offline" />
        <Avatar name="Acme Labs" size="md" shape="square" />
        <Avatar name="Globex" size="md" shape="square" status="online" />
      </div>
      <AvatarGroup names={team} max={4} />
      <AvatarGroup names={team} max={3} size="md" shape="square" />
      <div className="grid gap-3">
        <UserInfo name="Aarav Mehta" subtitle="Senior engineer · Pune" status="online" size="md" />
        <UserInfo name="Diya Rao" subtitle="diya.rao@acme.in" />
      </div>
    </div>
  );
}
