import { Accordion } from '@/components/ui/accordion';

export default function AccordionDemo() {
  return (
    <Accordion
      className="w-full max-w-lg"
      defaultOpen={['a']}
      items={[
        { id: 'a', title: 'How are leave balances calculated?', content: 'Accrual runs on the first of every month, pro-rated for new joiners.' },
        { id: 'b', title: 'Can managers delegate approvals?', content: 'Yes. Set a delegate for any date range from the approvals page.' },
        { id: 'c', title: 'Where is payroll data stored?', content: 'Encrypted at rest, in the region you pick at signup.' },
      ]}
    />
  );
}
