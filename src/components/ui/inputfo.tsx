import * as React from 'react';

import { cn } from '../../utils/utils';
import { colorVariants, styles } from '../Theme/InputStyles';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  color?:
    | 'default'
    | 'error'
    | 'success'
    | 'warning'
    | 'info'
    | 'primary'
    | 'secondary'
    | 'accent';
  label: string;
  rounded?: string;
  classNameLabel?: string;
  multipleError?: boolean;
}

const InputFO = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      classNameLabel,
      color = 'default',
      id,
      label,
      name,
      placeholder,
      rounded = 'rounded-sm',
      type,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn('relative w-full h-full', className)}>
        <input
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          className={cn(
            styles.input,
            className,
            rounded,
            colorVariants[color].input
          )}
          ref={ref}
          {...props}
        ></input>
        <label
          htmlFor={id}
          className={cn(
            styles.label,
            rounded,
            classNameLabel,
            colorVariants[color].label
          )}
        >
          {label || placeholder}
        </label>
      </div>
    );
  }
);

InputFO.displayName = 'InputFO';

export { InputFO };
