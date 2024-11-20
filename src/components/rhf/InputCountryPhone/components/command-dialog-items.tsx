import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/presentation/components/ui/command';
import { CommandProps } from './command-items-responsive';
import { RenderTwemoji } from '@/presentation/components/shared';
import { parseCountry } from 'react-international-phone';
import { getFlagEmoji } from '@/utils/utils';
import { useEffect, useRef, useState } from 'react';

export const CommandDialogItems = ({
  items,
  selectedItem,
  setItem,
}: CommandProps) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null); // Referencia al botón para devolver foco
  const [open, setOpen] = useState(false);
  /*   useEffect(() => {
    if (!open) {
      buttonRef.current?.focus(); 
    }
  }, [open]); */

  const handleSelect = (iso2: string) => {
    buttonRef.current?.focus();
    setOpen((open) => !open);
    setItem(iso2);
  };
  return (
    <>
      <button
        ref={buttonRef}
        className='absolute top-[13px] left-3 btn btn-xs btn-circle btn-ghost btn-primary'
        type='button'
        onClick={() => {
          setOpen((open) => !open);
          if (!open) {
            buttonRef.current?.focus();
          }
        }}
      >
        <RenderTwemoji
          emoji={getFlagEmoji(selectedItem.iso2)}
          className='flex w-[22px] min-w-[22px] h-[22px] overflow-hidden rounded-full'
        />
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          className='text-base'
          placeholder='Type a country or search...'
        />
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
      </CommandDialog>
    </>
  );
};
