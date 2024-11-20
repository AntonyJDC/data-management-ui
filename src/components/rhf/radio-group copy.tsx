import { Controller } from 'react-hook-form';
import { RadioGroup as RadioGroupUI, RadioGroupItem } from '../ui/radio-group';
import { ErrorMessageAdapter } from './error-message-adapter';

interface Option {
  label: string;
  value: string;
}

interface RadioGroupProps {
  control: any;
  name: string;
  orientation?: 'vertical' | 'horizontal';
  options: Option[];
  multipleError?: boolean;
}

const RadioGroup = ({
  control,
  name,
  orientation = 'horizontal',
  options,
  multipleError = false,
}: RadioGroupProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value, onBlur, name, ref, ...rest },
        formState: { errors },
      }) => {
        return (
          <>
            <div>
              <RadioGroupUI
                orientation={orientation}
                className='flex flex-row'
                onValueChange={(values: any) => {
                  onChange({
                    label: values.charAt(0).toUpperCase() + values.slice(1),
                    value: values,
                  });
                }}
                {...rest}
                ref={ref}
                onBlur={onBlur}
                value={value?.value || null}
                defaultValue={options[0]?.value || ''}
              >
                {options.map((option, index) => (
                  <div className='flex-1' key={option.value}>
                    <label
                      htmlFor={`r${index}`}
                      className={`btn w-full btn-ghost border-base-content/50 hover:border-base-content cursor-pointer ${
                        errors[name] ? 'border-error' : ''
                      }`}
                    >
                      <RadioGroupItem
                        value={option.value}
                        id={`r${index}`}
                        aria-label={`${option.label} Type`}
                      />
                      <span className=''>{option.label}</span>
                    </label>
                  </div>
                ))}
              </RadioGroupUI>
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
  );
};

RadioGroup.displayName = 'RadioGroup';

export { RadioGroup };
