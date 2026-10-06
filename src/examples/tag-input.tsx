import * as React from 'react';
import { TagInput } from '@/components/ui/tag-input';

export default function TagInputDemo() {
  const [v, setV] = React.useState(['Design', 'Remote']);
  return <TagInput className="w-full max-w-sm" value={v} onValueChange={setV} placeholder="Add skills, press Enter" />;
}
