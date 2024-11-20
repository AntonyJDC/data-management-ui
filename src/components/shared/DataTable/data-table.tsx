import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { IoIosRefresh } from 'react-icons/io';
import type { ColumnDef, ColumnSort } from '@tanstack/react-table';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { FaFileExport, FaFilter } from 'react-icons/fa';
import {
  IndeterminateCheckbox,
  PopoverFindColumn,
} from '../../../admin/components';
import {
  MdFirstPage,
  MdLastPage,
  MdNavigateBefore,
  MdNavigateNext,
} from 'react-icons/md';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/presentation/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/presentation/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/presentation/components/ui/table';
import {
  ScrollArea,
  ScrollBar,
} from '@/presentation/components/ui/scroll-area';
import { cn } from '@/utils/utils';

import { NumericFormat } from 'react-number-format';

export type ExtendedColumnDef<TData, TValue> = ColumnDef<TData, TValue> & {
  businessName?: string;
};

interface ReactTableProps<T extends object> {
  data: T[];
  columns: ExtendedColumnDef<any, any>[];
  messageNoData?: any;
  setData?: any;
  className?: string;
  isFetching?: boolean;
  isError?: boolean;
  errorNoData?: any;
  refetch?: () => void;
}
type SortingState = ColumnSort[];

function useSkipper() {
  const shouldSkipRef = useRef(true);
  const shouldSkip = shouldSkipRef.current;

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  useEffect(() => {
    shouldSkipRef.current = true;
  });

  return [shouldSkip, skip] as const;
}

export const DataTable = memo(
  <T extends object>({
    data,
    columns,
    messageNoData = <div>No logs</div>,
    setData,
    className,
    isFetching,
    errorNoData = <div>Error</div>,
    isError,
    refetch,
  }: ReactTableProps<T>) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [rowSelection, setRowSelection] = useState({});
    const [loading, setLoading] = useState(false);
    const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      state: {
        sorting,
        globalFilter,
        rowSelection,
      },
      enableRowSelection: true,
      onSortingChange: setSorting,
      onGlobalFilterChange: setGlobalFilter,
      getFilteredRowModel: getFilteredRowModel(),
      onRowSelectionChange: setRowSelection,
      autoResetPageIndex,
      meta: {
        updateData: (rowIndex: any, columnId: any, value: any) => {
          skipAutoResetPageIndex();
          setData((old: any) =>
            old.map((row: any, index: any) => {
              if (index === rowIndex) {
                return {
                  ...old[rowIndex]!,
                  [columnId]: value,
                };
              }
              return row;
            })
          );
        },
      },
    });

    return (
      <div
        className={`${className} grid grid-cols-1 rounded-2xl shadow-uniform-sm`}
      >
        <div
          id='table-header'
          className='flex flex-wrap flex-row rounded-t-2xl gap-4 p-4 bg-base-200'
        >
          {/*   <select className='select select-bordered  w-full lg:w-52 '>
          <option>Who shot first?</option>
          <option selected>Stock</option>
          <option>Greedo</option>
        </select>

        <select className='select select-bordered w-full lg:w-52'>
          <option>Who shot first?</option>
          <option selected>Publish</option>
          <option>Greedo</option>
        </select>

        <label className='input input-bordered flex items-center gap-2  w-full lg:w-52'>
          <input
            type='text'
            className='grow'
            placeholder='Search'
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
            className='w-4 h-4 opacity-70'
          >
            <path
              fillRule='evenodd'
              d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'
              clipRule='evenodd'
            />
          </svg>
        </label> */}
          <label className='w-full lg:w-96 input input-bordered flex items-center gap-2'>
            <input
              type='text'
              className='grow'
              placeholder='Search Global'
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 16 16'
              fill='currentColor'
              className='h-4 w-4 opacity-70'
            >
              <path
                fillRule='evenodd'
                d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'
                clipRule='evenodd'
              />
            </svg>
          </label>
          <div className='flex flex-row gap-2 flex-grow  justify-end'>
            <div className='flex flex-wrap items-center'>
              <PopoverFindColumn table={table} />
              <button type='button' className='btn btn-ghost flex-auto btn-sm'>
                <FaFilter className='h-4 w-4' />
                Filters
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type='button'
                    tabIndex={0}
                    role='button'
                    className='btn btn-ghost btn-sm m-1 flex-auto'
                  >
                    <FaFileExport className='h-4 w-4' />
                    Export
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuItem>Download as CSV</DropdownMenuItem>
                  <DropdownMenuItem>Print</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        <div>
          <ScrollArea
            className={cn('rounded-none', 'overflow-auto', {
              'h-[53dvh]':
                table.getRowModel().rows.length === 0 ||
                table.getRowModel().rows.length > 5,
            })}
            /* className={cn('border rounded-none', 'overflow-auto', `h-[550px]`)} */
          >
            {isFetching && (
              <div className='absolute inset-0 flex items-center justify-center bg-base-200 bg-opacity-50 z-10 animate-in fade-in duration-500'>
                <span className='loading loading-ring loading-lg'></span>
              </div>
            )}
            {isError && !isFetching && (
              <div className='absolute inset-0 flex items-center bg-opacity-50 justify-center bg-base-200  z-10 animate-in fade-in duration-500'>
                {errorNoData}
              </div>
            )}
            <Table>
              <TableHeader className='sticky -top-[1px] bg-base-100 z-10'>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          onClick={header.column.getToggleSortingHandler()}
                          className={cn(
                            'px-1',
                            header.id === 'select' ? 'text-center' : ''
                          )}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className='bg-base-200'>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                      className='cursor-pointer animate-in fade-in duration-500 border-dashed'
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className='text-center h-[calc(53dvh-99px)]'
                    >
                      {!isFetching && !isError ? <>{messageNoData}</> : <></>}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              <TableFooter className='sticky -bottom-[1px]'>
                <TableRow className='h-12'>
                  <TableHead className='text-center'>
                    <IndeterminateCheckbox
                      className='checkbox checkbox-sm'
                      {...{
                        checked: table.getIsAllPageRowsSelected(),
                        indeterminate: table.getIsSomePageRowsSelected(),
                        onChange: table.getToggleAllPageRowsSelectedHandler(),
                      }}
                    />
                  </TableHead>
                  <TableHead className='text-base-content' colSpan={20}>
                    Page Rows ({table.getRowModel().rows.length})
                  </TableHead>
                </TableRow>
              </TableFooter>
            </Table>
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        </div>
        <div
          id='table-footer'
          className='md:justify-evenly px-4 gap-y-2 flex items-center flex-wrap flex-row justify-end space-x-2 py-4 rounded-b-2xl bg-base-200'
        >
          <div className='flex lg:flex-1 justify-center lg:justify-start text-center text-sm text-muted-foreground w-full items-center'>
            <button
              className='btn btn-ghost btn-circle btn-sm'
              type='button'
              disabled={loading}
              onClick={async () => {
                setLoading(!loading);
                if (refetch) await refetch();
                setLoading(false);
              }}
            >
              {loading ? (
                <span className='loading loading-spinner loading-sm'></span>
              ) : (
                <IoIosRefresh className='' size={22} />
              )}
            </button>
            <p className='ml-2'>
              {Object.keys(rowSelection).length} of{' '}
              {table.getPreFilteredRowModel().rows.length} Total Rows Selected
            </p>
          </div>
          <div className='flex space-x-2 text-center w-full justify-center lg:text-right lg:w-auto'>
            <button
              type='button'
              className='btn btn-sm'
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <MdFirstPage className='w-5 h-5' />
            </button>
            <button
              type='button'
              className='btn btn-sm'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <MdNavigateBefore className='w-5 h-5' />
            </button>
            <button
              type='button'
              className='btn btn-sm'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <MdNavigateNext className='w-5 h-5' />
            </button>
            <button
              type='button'
              className='btn btn-sm'
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <MdLastPage className='w-5 h-5' />
            </button>
          </div>
          <div className='flex justify-center gap-x-2 w-full md:w-1/2 lg:w-auto'>
            <span className='flex items-center gap-1'>
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount().toLocaleString()}
              </strong>
            </span>
            <span className='flex items-center gap-2'>
              | Go to page:
              <NumericFormat
                value={table.getState().pagination.pageIndex + 1}
                allowNegative={false}
                decimalScale={0}
                aria-label='Enter Price'
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  if (page <= table.getPageCount()) {
                    table.setPageIndex(page);
                  }
                }}
                max={table.getPageCount()}
                className='h-8 p-1 rounded w-16 text-center flex border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                disabled={table.getRowModel().rows?.length ? false : true}
              />
            </span>
          </div>
          <div className=' flex justify-center w-full md:w-1/3 lg:w-auto gap-2 items-center'>
            <span className='self-center'>Rows per page:</span>
            <Select
              onValueChange={(e) => {
                table.setPageSize(Number(e));
              }}
              disabled={table.getRowModel().rows?.length ? false : true}
              value={table.getState().pagination.pageSize.toString()}
            >
              <SelectTrigger className='w-auto h-8'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem
                    key={pageSize}
                    value={pageSize.toString()}
                    className=''
                  >
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    );
  }
);
