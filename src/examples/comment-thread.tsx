import * as React from 'react';
import { CommentThread, type Comment } from '@/components/ui/comment-thread';

const add = (list: Comment[], parent: string, c: Comment): Comment[] =>
  list.map((x) => (x.id === parent ? { ...x, replies: [...(x.replies ?? []), c] } : { ...x, replies: x.replies && add(x.replies, parent, c) }));

export default function CommentThreadDemo() {
  const [comments, setComments] = React.useState<Comment[]>([
    { id: '1', author: 'Meera Shah', time: '2h ago', body: 'Can we move the review to Thursday?', replies: [
      { id: '2', author: 'Rohan Iyer', time: '1h ago', body: 'Thursday works for me.' },
    ] },
    { id: '3', author: 'Kabir Anand', time: '30m ago', body: 'Added the updated budget sheet.' },
  ]);
  return <CommentThread className="w-full max-w-lg" comments={comments} onReply={(p, text) => setComments((c) => add(c, p, { id: crypto.randomUUID(), author: 'You', time: 'just now', body: text }))} />;
}
