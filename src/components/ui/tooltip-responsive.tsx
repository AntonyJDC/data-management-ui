import { MdOutlineInfo } from 'react-icons/md';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useMediaQuery } from '@/presentation/hooks';
import { useRef, useState } from 'react';

interface TooltipResponsiveProps {
  textTooltip?: string;
  className?: string;
  alignDesktop?: 'center' | 'end' | 'start';
  alignMobile?: 'center' | 'end' | 'start';
}

export const TooltipResponsive = ({
  textTooltip,
  className,
  alignDesktop = 'center',
  alignMobile = 'center',
}: TooltipResponsiveProps) => {
  console.log('TooltipResponsive');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isDesktop = !useMediaQuery('(min-width: 768px)');
  const [isOpen, setIsOpen] = useState(false);
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };
  return (
    <div
      className={className}
      onMouseEnter={isDesktop ? handleMouseEnter : undefined}
      onMouseLeave={isDesktop ? handleMouseLeave : undefined}
    >
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger className='btn btn-circle btn-ghost btn-xs flex items-center'>
          <MdOutlineInfo size={20} />
        </PopoverTrigger>
        <PopoverContent
          side='top'
          align={isDesktop ? alignDesktop : alignMobile}
          className='max-w-max whitespace-normal'
        >
          <p>{textTooltip}</p>
        </PopoverContent>
      </Popover>
    </div>
  );
};
