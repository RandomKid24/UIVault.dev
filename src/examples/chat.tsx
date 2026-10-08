import * as React from 'react';
import { Chat, type ChatMessage } from '@/components/ui/chat';

const m = (id: string, from: string, text: string, ago: number): ChatMessage => ({ id, from, text, at: Date.now() - ago * 60000 });

export default function ChatDemo() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    m('1', 'Diya Rao', 'Hey! Did the offer letter go out to Kabir?', 14),
    m('2', 'Diya Rao', 'He is asking about the joining date.', 13),
    m('3', 'You', 'Sent it this morning. Joining is 3 Nov.', 9),
    m('4', 'Diya Rao', 'Perfect, I will update the onboarding board.', 8),
  ]);
  const [typing, setTyping] = React.useState<string>();
  const send = (text: string) => {
    setMessages((l) => [...l, { id: String(Date.now()), from: 'You', text, at: Date.now() }]);
    setTyping('Diya Rao');
    setTimeout(() => {
      setTyping(undefined);
      setMessages((l) => [...l, { id: String(Date.now()), from: 'Diya Rao', text: 'Got it, thanks!', at: Date.now() }]);
    }, 1500);
  };
  return <Chat me="You" messages={messages} onSend={send} typing={typing} />;
}
