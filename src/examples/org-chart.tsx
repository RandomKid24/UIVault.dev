import { OrgChart, type OrgNode } from '@/components/ui/org-chart';

const tree: OrgNode = {
  id: 'ceo', name: 'Meera Iyer', title: 'CEO',
  children: [
    { id: 'cto', name: 'Aarav Mehta', title: 'CTO', children: [
      { id: 'e1', name: 'Rohan Das', title: 'Backend lead', children: [{ id: 'e1a', name: 'Ananya K.', title: 'Engineer' }, { id: 'e1b', name: 'Arjun Reddy', title: 'Engineer' }] },
      { id: 'e2', name: 'Diya Rao', title: 'Design lead' },
    ] },
    { id: 'cfo', name: 'Kabir Shah', title: 'CFO', children: [{ id: 'f1', name: 'Nikhil Patil', title: 'Accounts' }] },
    { id: 'chro', name: 'Isha Nair', title: 'Head of People', children: [{ id: 'h1', name: 'Pooja Desai', title: 'Recruiter' }, { id: 'h2', name: 'Tara Menon', title: 'HR partner' }] },
  ],
};

export default function OrgChartDemo() {
  return <OrgChart root={tree} openLevels={2} />;
}
