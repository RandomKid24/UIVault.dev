import { CodeBlock } from '@/components/ui/code-block';

export default function CodeBlockDemo() {
  return <CodeBlock className="w-full max-w-lg" title="terminal" lineNumbers code={`npx github:RandomKid24/befui init\nnpx github:RandomKid24/befui add button card`} />;
}
