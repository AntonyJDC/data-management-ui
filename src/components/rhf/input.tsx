import React from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { cn } from '@/utils/utils';
import { colorVariants, styles } from '@/presentation/components/Theme/InputStyles';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  color?:
    | 'default'
    | 'error'
    | 'success'
    | 'warning'
    | 'info'
    | 'primary'
    | 'secondary'
    | 'accent';
  label?: string;
  className?: string;
  name: string;
  placeholder: string;
  errors: any;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      label,
      placeholder,
      type,
      className = 'h-12',
      color = 'default',
      errors = [],
      ...props
    },
    ref
  ) => {
    return (
      <div className='w-full'>
        <div className={cn('relative', className)}>
          <input
            id={id}
            name={name}
            type={type}
            className={cn(
              styles.input,
              errors[name]
                ? colorVariants['error'].input
                : colorVariants[color].input
            )}
            placeholder={placeholder}
            ref={ref}
            {...props}
          />
          <label
            htmlFor={id}
            className={cn(
              styles['label'],
              errors[name]
                ? colorVariants['error'].label
                : colorVariants[color].label
            )}
          >
            {label}
          </label>
        </div>
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => (
            <div className=''>
              <span className='text-error'>{message}</span>
            </div>
          )}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
