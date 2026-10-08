import { SearchBar } from '@/components/ui/search-bar';
import { toast } from '@/components/ui/toast';

const items = ['Employee directory', 'Leave approvals', 'Payroll run', 'Attendance report', 'Org chart', 'Recruitment pipeline', 'Performance reviews'].map((label, i) => ({ id: String(i), label, hint: i < 4 ? 'HRMS' : 'Page' }));

export default function SearchBarDemo() {
  return <SearchBar className="w-full max-w-sm" items={items} recent={items.slice(0, 3)} placeholder="Search pages" onSelect={(i) => toast.info(`Open ${i.label}`)} />;
}
