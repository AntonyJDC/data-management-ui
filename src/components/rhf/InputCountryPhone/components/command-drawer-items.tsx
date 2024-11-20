import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/presentation/components/ui/drawer';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/presentation/components/ui/command';
import { RenderTwemoji } from '@/presentation/components/shared';
import { CommandProps } from './command-items-responsive';
import { getFlagEmoji } from '@/utils/utils';
import { parseCountry } from 'react-international-phone';
import { useState } from 'react';

export const CommandDrawerItems = ({
  items,

  selectedItem,
  setItem,
}: CommandProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (iso2: string) => {
    setOpen((open) => !open);
    setItem(iso2);
  };
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button
          className=' absolute top-[13px] left-3 btn btn-xs btn-circle btn-ghost'
          type='button'
          onClick={() => {
            setOpen((open) => !open);
          }}
        >
          <RenderTwemoji
            emoji={getFlagEmoji(selectedItem.iso2)}
            className='flex w-[22px] min-w-[22px] h-[22px] overflow-hidden rounded-full'
          />
        </button>
      </DrawerTrigger>
      <DrawerContent className='p-1'>
        <DrawerHeader className='text-left'>
          <DrawerTitle>Search Country</DrawerTitle>
          <DrawerDescription hidden>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <Command className='rounded-lg border shadow-md md:min-w-[450px]'>
          <CommandInput placeholder='Type a command or search...' />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading='Countries'>
              {items.map((c) => {
                const country = parseCountry(c);
                const emoji = getFlagEmoji(country.iso2);
                return (
                  <CommandItem
                    key={country.iso2}
                    keywords={[country.dialCode, country.name]}
                    onSelect={() => handleSelect(country.iso2)}
                    className='cursor-pointer'
                  >
                    <RenderTwemoji
                      emoji={emoji}
                      className='flex w-[22px] min-w-[22px] h-[22px] overflow-hidden rounded-full'
                    />
                    <span className='mx-2 text-base font-normal'>
                      {country.name}
                    </span>
                    <span>+({country.dialCode})</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
        <DrawerFooter className='p-1'>
          <DrawerClose className='btn btn-outline btn-sm btn-error w-full'>
            Cancel
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
