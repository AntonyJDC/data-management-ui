import { cn } from '@/utils/utils';
import { colorVariants, styles } from '../../Theme/InputStyles';
import { useController } from 'react-hook-form';
import { ErrorMessageAdapter } from '../error-message-adapter';
import { defaultCountries, usePhoneInput } from 'react-international-phone';
import { TooltipResponsive } from '../../ui';
import { CommandItemsResponsive } from './components/command-items-responsive';

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
  classNameWrapper?: string;
  multipleError?: boolean;
  control: any;
  required?: boolean;
  tooltip?: boolean;
  textTooltip?: string;
  flag?: boolean;
}

const InputCountryPhoneFO = ({
  className,
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
  flag = true,
}: InputProps) => {
  console.log('Render InputCountryPhoneFO');

  const {
    field: { ref, value, onChange, ...inputProps },
    formState: { errors },
  } = useController({
    name,
    control,
  });

  const { setCountry, country, handlePhoneValueChange, inputValue, inputRef } =
    usePhoneInput({
      defaultCountry: 'co',
      forceDialCode: true,
      value: value,
      countries: defaultCountries,
      onChange: (data) => {
        onChange(data.phone);
      },
    });

  return (
    <div className={`w-full ${classNameWrapper}`}>
      <div className='relative'>
        {tooltip ? (
          <TooltipResponsive
            className='flex place-items-center absolute text-blue-gray-500 top-2/4 right-3 -translate-y-2/4 w-5 h-5'
            textTooltip={textTooltip}
          />
        ) : (
          <></>
        )}
        {flag && (
          <CommandItemsResponsive
            items={defaultCountries}
            setItem={setCountry}
            selectedItem={country}
          />
        )}
        <input
          id={id}
          type={type}
          className={cn(
            styles.input,
            '-z-20 pl-11 pr-2.5',
            className,
            rounded,
            errors[name]
              ? colorVariants.error.input
              : colorVariants[color].input
          )}
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => {
            handlePhoneValueChange(e);
          }}
          ref={(el) => {
            ref(el);
            inputRef.current = el;
          }}
          {...inputProps}
        />
        <label
          htmlFor={id}
          className={cn(
            styles.label,
            'left-0 peer-placeholder-shown:left-10 peer-focus:left-1',
            rounded,
            classNameLabel,
            errors[name]
              ? colorVariants.error.label
              : colorVariants[color].label
          )}
        >
          {label || placeholder}
          <span className={cn('text-error', required ? '' : 'hidden')}></span>
        </label>
      </div>

      <ErrorMessageAdapter
        errors={errors}
        name={name}
        multipleError={multipleError}
      />
    </div>
  );
};

InputCountryPhoneFO.displayName = 'InputCountryPhoneFO';

export { InputCountryPhoneFO };
