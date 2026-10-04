import * as React from 'react';
import { Pagination } from '@/components/ui/pagination';

export default function PaginationDemo() {
  const [page, setPage] = React.useState(5);
  return <Pagination page={page} pageCount={12} onPageChange={setPage} />;
}
