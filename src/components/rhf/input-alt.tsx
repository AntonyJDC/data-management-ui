import React from 'react';
import { ErrorMessage } from '@hookform/error-message';

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

const InputAlt = React.forwardRef<HTMLInputElement, InputProps>(
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
        <div className='relative m-4 max-w-[fit-content] group bg-primary'>
          <input
            id={id}
            name={name}
            type={type}
            className='placeholder:opacity-0 outline-none px-3 py-3 peer bg-base-200'
            placeholder={placeholder}
            ref={ref}
            {...props}
          />

          <label
            className='absolute left-[9px] top-px text-sm text-gray-500 transition-all duration-150 px-1 transform -translate-y-1/2 pointer-events-none
  peer-placeholder-shown:top-6 peer-placeholder-shown:text-xl peer-placeholder-shown:font-normal group-focus-within:!top-px group-focus-within:!text-sm group-focus-within:!font-bold group-focus-within:!text-blue-500'
          >
            {label}
          </label>

          <fieldset
            className='inset-0 absolute border border-base-content/20 rounded pointer-events-none mt-[-9px] invisible peer-placeholder-shown:visible 
  group-focus-within:!border-blue-500 group-focus-within:border-2 group-hover:border-base-content'
          >
            <legend className='ml-2 px-0 text-sm transition-all duration-150 invisible max-w-[0.01px] group-focus-within:max-w-full group-focus-within:px-1 whitespace-nowrap'>
              {label}
            </legend>
          </fieldset>

          <fieldset
            className='inset-0 absolute border border-green-500  rounded pointer-events-none mt-[-9px] visible peer-placeholder-shown:invisible 
  group-focus-within:border-2 group-focus-within:!border-blue-500 group-hover:border-base-content'
          >
            <legend className='ml-2 text-sm invisible px-1 max-w-full whitespace-nowrap'>
              {label}
            </legend>
          </fieldset>
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
InputAlt.displayName = 'InputAlt';

export { InputAlt };
