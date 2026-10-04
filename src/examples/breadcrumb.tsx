import { Breadcrumb } from '@/components/ui/breadcrumb';

export default function BreadcrumbDemo() {
  return <Breadcrumb items={[{ label: 'People', href: '#' }, { label: 'Employees', href: '#' }, { label: 'Aarav Mehta' }]} />;
}
