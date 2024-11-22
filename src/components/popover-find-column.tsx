import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../components/ui/popover';
import { InputFO } from '../components/ui';
import { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import {
  AccessorColumnDef,
  DisplayColumnDef,
  GroupColumnDef,
} from '@tanstack/react-table';

interface MyColumnDef<T> {
  columnDef:
    | DisplayColumnDef<T, unknown>
    | GroupColumnDef<T, unknown>
    | AccessorColumnDef<T, unknown>;
  businessName?: string;
}

const PopoverFindColumn = <T extends object>({ table }: any) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterColumn, setFilterColumn] = useState<MyColumnDef<T>[]>();

  useEffect(() => {
    const allColumns = table.getAllLeafColumns();
    const results = allColumns.filter((column: any) =>
      column.columnDef.businessName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilterColumn(results);
  }, [searchTerm]);

  return (
    <Popover
      onOpenChange={(e) => {
        if (e) {
          setSearchTerm('');
        }
      }}
    >
      <PopoverTrigger className='flex-auto' asChild>
        <button className='btn btn-ghost btn-sm m-1'>
          <FaEye className='h-4 w-4' />
          Column
        </button>
      </PopoverTrigger>
      <PopoverContent className='p-3 w-auto h-auto' align='center'>
        <div className='grid gap-4'>
          <InputFO
            className='h-11'
            label='Find Column'
            id='2'
            type='text'
            placeholder='Column title'
            name='find_column'
            color='default'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          ></InputFO>
          <ul
            tabIndex={0}
            className='
        w-auto z-10 rounded-box space-y-2'
          >
            {filterColumn && filterColumn?.length > 0 ? (
              filterColumn?.map((column: any) => {
                return (
                  <li key={column.columnDef.id}>
                    <label className='flex items-center  cursor-pointer space-x-2'>
                      <input
                        className='toggle rounded-sm toggle-sm'
                        {...{
                          type: 'checkbox',
                          disabled: !column.getCanHide(),
                          checked: column.getIsVisible(),
                          onChange: column.getToggleVisibilityHandler(),
                        }}
                      />
                      <span className='label-text'>
                        {column.columnDef?.businessName}
                      </span>
                    </label>
                  </li>
                );
              })
            ) : (
              <p>No hay resultados</p>
            )}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
};

PopoverFindColumn.displayName = 'PopoverFindColumn';

export { PopoverFindColumn };
