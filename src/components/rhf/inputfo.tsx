import * as React from 'react';

import { cn } from '@/utils/utils';
import { colorVariants, styles } from '../Theme/InputStyles';
import { Controller } from 'react-hook-form';
import { ErrorMessageAdapter } from './error-message-adapter';
import { TooltipResponsive } from '../ui';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
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
  classNameWrapper?: string;
  multipleError?: boolean;
  control: any;
  required?: boolean;
  tooltip?: boolean;
  textTooltip?: string;
  format?: (value: string) => string;
}

const InputFO = ({
  className = 'bg-base-200',
  classNameLabel,
  classNameWrapper,
  color = 'default',
  control,
  required = false,
  id,
  label,
  multipleError = false,
  name,
  placeholder,
  rounded = 'rounded-lg',
  type,
  textTooltip,
  tooltip = false,
  format,
  ...props
}: InputProps) => {
  console.log('Render InputFO', name);

  return (
    <div className={`w-full  ${classNameWrapper}`}>
      <Controller
        name={name}
        control={control}
        render={({
          field: { value, onChange, ...rest },
          formState: { errors },
        }: any) => {
          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = e.target.value;
            const formattedValue = format ? format(inputValue) : inputValue;
            onChange(formattedValue);
          };

          return (
            <>
              <div className={`relative ${className}`}>
                {tooltip && (
                  <TooltipResponsive
                    className='flex place-items-center absolute text-blue-gray-500 top-2/4 right-3 -translate-y-2/4 w-5 h-5'
                    textTooltip={textTooltip}
                  />
                )}
                <input
                  id={id}
                  type={type}
                  className={cn(
                    styles.input,
                    rounded,
                    errors[name]
                      ? colorVariants.error.input
                      : colorVariants[color].input
                  )}
                  placeholder={placeholder}
                  value={value || ''}
                  onChange={handleChange}
                  {...rest}
                  {...props}
                />
                <label
                  htmlFor={id}
                  className={cn(
                    styles.label,
                    rounded,
                    classNameLabel,
                    errors[name]
                      ? colorVariants.error.label
                      : colorVariants[color].label
                  )}
                >
                  {label || placeholder}
                  <span className={cn('text-error', required ? '' : 'hidden')}>
                    {' *'}
                  </span>
                </label>
              </div>

              <ErrorMessageAdapter
                errors={errors}
                name={name}
                multipleError={multipleError}
              />
            </>
          );
        }}
      />
    </div>
  );
};

InputFO.displayName = 'InputFO';

export { InputFO };
