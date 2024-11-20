import { cn } from '@/utils/utils';
import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { FieldErrors, useController } from 'react-hook-form';

export interface CheckBoxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errors?: FieldErrors;
  name: string;
  label?: string;
  rounded?: string;
  classNameLabel?: string;
  multipleError?: boolean;
  control: any;
}

const CheckBox = ({
  className,
  classNameLabel,
  id,
  label,
  name,
  placeholder,
  rounded = 'rounded-sm',
  type = 'checkbox',
  children,
  multipleError = false,
  control,
  ...props
}: CheckBoxProps) => {
  const {
    field: { ref, value, onChange, ...inputProps },
    formState: { errors },
  } = useController({
    name,
    control,
  });
  return (
    <div className='flex flex-col'>
      <label htmlFor={id} className='label justify-start'>
        <input
          {...inputProps}
          id={id}
          className={cn('checkbox', rounded)}
          type={type}
          ref={ref}
          checked={value}
          onChange={onChange}
          placeholder={placeholder}
          {...props}
        />
        {children}
      </label>
      {multipleError ? (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ messages }: any) => {
            let messagesCont: string[] = [];
            for (let key in messages) {
              if (Array.isArray(messages[key])) {
                messagesCont = [...messagesCont, ...messages[key]];
              } else {
                messagesCont.push(messages[key]);
              }
            }
            return (
              <ul className='pt-1'>
                {messagesCont.map((mensaje, indice) => (
                  <li className='text-error' key={indice}>
                    <span>❌ </span> {mensaje}
                  </li>
                ))}
              </ul>
            );
          }}
        />
      ) : (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => <p className='text-error'>{message}</p>}
        />
      )}
    </div>
  );
};

CheckBox.displayName = 'CheckBox';

export { CheckBox };
