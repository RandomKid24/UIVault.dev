import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function TabsDemo() {
  return (
    <div className="grid w-full max-w-lg gap-8">
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="leave">Leave</TabsTrigger>
          <TabsTrigger value="docs">Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="text-[13px] text-muted-foreground">Underline tabs, good for page sections.</TabsContent>
        <TabsContent value="leave" className="text-[13px] text-muted-foreground">Leave balance and history.</TabsContent>
        <TabsContent value="docs" className="text-[13px] text-muted-foreground">Contracts and ID proofs.</TabsContent>
      </Tabs>
      <Tabs defaultValue="a">
        <TabsList variant="pill">
          <TabsTrigger value="a">Weekly</TabsTrigger>
          <TabsTrigger value="b">Monthly</TabsTrigger>
          <TabsTrigger value="c">Yearly</TabsTrigger>
        </TabsList>
        <TabsContent value="a" className="text-[13px] text-muted-foreground">Pill tabs, good for toggling a view.</TabsContent>
        <TabsContent value="b" className="text-[13px] text-muted-foreground">Monthly view.</TabsContent>
        <TabsContent value="c" className="text-[13px] text-muted-foreground">Yearly view.</TabsContent>
      </Tabs>
    </div>
  );
}
