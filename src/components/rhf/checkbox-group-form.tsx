import { useController, useWatch } from 'react-hook-form';
import { ErrorMessageAdapter } from './error-message-adapter';
import { cn } from '@/utils/utils';

interface Option {
  label: string;
  value: string | number;
}

interface CheckboxGroupProps {
  control: any;
  name: string;
  options: Option[];
  multipleError?: boolean;
  className?: string;
  title?: string;
  [x: string]: any;
}

const CheckboxGroupForm = ({
  control,
  name,
  options,
  multipleError = false,
  className = 'col-span-12 md:col-span-6',
  classNameWrapper = 'col-span-full',
  title,
  ...rest
}: CheckboxGroupProps) => {
  const {
    field: { ref, value, onChange, ...inputProps },
    formState: { errors },
  } = useController({
    name,
    control,
    defaultValue: [],
  });

  const checkboxIds = useWatch({ control, name: name }) || [];

  const handleChange = (item: string | number) => {
    const newArray = checkboxIds.includes(item)
      ? checkboxIds.filter((id: string | number) => id !== item)
      : [...checkboxIds, item];
    onChange(newArray);
  };

  return (
    <div className={`flex flex-col ${classNameWrapper}`}>
      <p className='text-sm font-semibold leading-6 pb-1'>{title}</p>
      <div className='grid grid-cols-12 gap-2'>
        {options.map(({ label, value }) => (
          <div className={className} key={value}>
            <label
              className={cn(
                'btn w-full btn-ghost border-base-content/50 hover:border-base-content cursor-pointer',
                { 'border-error': errors[name] }
              )}
            >
              <input
                {...inputProps}
                checked={checkboxIds.includes(value)}
                type='checkbox'
                ref={ref}
                className={cn(
                  'checkbox',
                  errors[name] ? 'checkbox-error' : 'checkbox-primary'
                )}
                onChange={() => handleChange(value)}
                disabled={rest.disabled}
              />
              <span
                className={cn('label-text', {
                  'text-error': errors[name],
                })}
              >
                {label}
              </span>
            </label>
          </div>
        ))}
      </div>
      <ErrorMessageAdapter
        errors={errors}
        name={name}
        multipleError={multipleError}
      />
    </div>
  );
};

CheckboxGroupForm.displayName = 'CheckboxGroupForm';

export { CheckboxGroupForm };
