import * as React from 'react';
import { TagManager, type Tag } from '@/components/ui/tag-manager';

export default function TagManagerDemo() {
  const [tags, setTags] = React.useState<Tag[]>([
    { id: '1', name: 'Urgent', color: 'rose' },
    { id: '2', name: 'Finance', color: 'green' },
    { id: '3', name: 'Q4 planning', color: 'violet' },
    { id: '4', name: 'Follow up', color: 'amber' },
  ]);
  return <TagManager tags={tags} onChange={setTags} usage={{ '1': 12, '2': 41, '3': 7, '4': 23 }} />;
}
