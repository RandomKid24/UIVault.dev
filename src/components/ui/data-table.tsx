import * as React from 'react';
import { ArrowDownIcon, ArrowUpIcon, SearchIcon, SortIcon } from './icons';
import { Pagination } from './pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';
import { cn } from '@/lib/utils';

export interface Column<T> {
  key: string;
  header: string;
  /** Value used for sorting and filtering. */
  value: (row: T) => string | number;
  /** Custom cell. Defaults to the value. */
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
  align?: 'left' | 'right';
}

/** Table with click-to-sort headers, a filter box and pagination. You pass rows and columns; it holds the rest of the state. */
export function DataTable<T>({
  rows,
  columns,
  rowKey,
  pageSize = 5,
  filterPlaceholder = 'Filter rows',
  className,
}: {
  rows: T[];
  columns: Column<T>[];
  rowKey: (row: T) => string;
  pageSize?: number;
  filterPlaceholder?: string;
  className?: string;
}) {
  const [q, setQ] = React.useState('');
  const [sort, setSort] = React.useState<{ key: string; dir: 1 | -1 } | null>(null);
  const [page, setPage] = React.useState(1);

  const data = React.useMemo(() => {
    const term = q.trim().toLowerCase();
    let out = term ? rows.filter((r) => columns.some((c) => String(c.value(r)).toLowerCase().includes(term))) : rows;
    const col = columns.find((c) => c.key === sort?.key);
    if (col && sort) out = [...out].sort((a, b) => {
      const x = col.value(a), y = col.value(b);
      return (typeof x === 'number' && typeof y === 'number' ? x - y : String(x).localeCompare(String(y))) * sort.dir;
    });
    return out;
  }, [rows, columns, q, sort]);

  const pageCount = Math.max(1, Math.ceil(data.length / pageSize));
  const current = Math.min(page, pageCount);
  const slice = data.slice((current - 1) * pageSize, current * pageSize);
  const toggle = (key: string) => setSort((s) => (s?.key !== key ? { key, dir: 1 } : s.dir === 1 ? { key, dir: -1 } : null));

  return (
    <div className={cn('grid gap-3', className)}>
      <div className="relative max-w-xs">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder={filterPlaceholder} className="h-9 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/15" />
      </div>
      <div className="overflow-hidden rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((c) => {
                const on = sort?.key === c.key;
                return (
                  <TableHead key={c.key} className={c.align === 'right' ? 'text-right' : undefined} aria-sort={on ? (sort!.dir === 1 ? 'ascending' : 'descending') : undefined}>
                    {c.sortable ? (
                      <button type="button" onClick={() => toggle(c.key)} className={cn('inline-flex items-center gap-1 rounded outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40', on && 'text-foreground')}>
                        {c.header}
                        {on ? (sort!.dir === 1 ? <ArrowUpIcon className="size-3.5" /> : <ArrowDownIcon className="size-3.5" />) : <SortIcon className="size-3.5 opacity-40" />}
                      </button>
                    ) : c.header}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {slice.map((r) => (
              <TableRow key={rowKey(r)} className="animate-in">
                {columns.map((c) => <TableCell key={c.key} className={c.align === 'right' ? 'text-right tabular-nums' : undefined}>{c.render ? c.render(r) : c.value(r)}</TableCell>)}
              </TableRow>
            ))}
            {slice.length === 0 && <TableRow><TableCell colSpan={columns.length} className="py-10 text-center text-muted-foreground">No rows match.</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{data.length} row{data.length === 1 ? '' : 's'}</span>
        {pageCount > 1 && <Pagination page={current} pageCount={pageCount} onPageChange={setPage} />}
      </div>
    </div>
  );
}
