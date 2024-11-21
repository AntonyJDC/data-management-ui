import React, { forwardRef } from 'react';

import { cn } from '../../../../../utils/utils';

export interface Props {
  children: React.ReactNode;
  className: string;
}

export const List = forwardRef<HTMLUListElement, Props>(
  (
    {
      children,
      className = 'grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-3 gap-2',
    }: Props,
    ref
  ) => {
    return (
      <ul ref={ref} className={cn('grid', className)}>
        {children}
      </ul>
    );
  }
);
