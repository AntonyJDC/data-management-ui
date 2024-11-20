import { Row } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/presentation/components/ui/dropdown-menu';
import { MdMoreVert } from 'react-icons/md';
import { FaClone, FaEdit, FaTrashAlt } from 'react-icons/fa';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onEdit: (value: TData) => void;
  onDelete: (value: TData) => void;
}

export const DataTableRowActions = <TData,>({
  row,
  onEdit,
  onDelete,
}: DataTableRowActionsProps<TData>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='btn btn-ghost btn-sm btn-primary'>
          <MdMoreVert className='h-4 w-4' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='rounded-lg'>
        <DropdownMenuItem onClick={() => onEdit(row.original)}>
          <FaClone size={17} />
          <span className='ml-3 font-semibold'>Clone</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEdit(row.original)}>
          <FaEdit size={17} />
          <span className='ml-3 font-semibold'>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(row.original)}>
          <FaTrashAlt className='text-error' size={15} />
          <span className='ml-3 text-error font-normal'>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
