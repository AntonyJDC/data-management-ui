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
  [x: string]: any;
}

const CheckboxGroup = ({
  control,
  name,
  options,
  multipleError = false,
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
    <div className='flex flex-col'>
      <div className='join gap-x-4 flex flex-wrap'>
        {options.map(({ label, value }) => (
          <label key={value} className='label cursor-pointer'>
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
              className={cn('label-text pl-2', { 'text-error': errors[name] })}
            >
              {label}
            </span>
          </label>
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

CheckboxGroup.displayName = 'CheckboxGroup';

export { CheckboxGroup };
