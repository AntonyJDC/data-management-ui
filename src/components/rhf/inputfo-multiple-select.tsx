import { v4 as uuidv4 } from 'uuid';
import Select, {
  ClearIndicatorProps,
  MultiValueRemoveProps,
  type Props,
  StylesConfig,
  /*  Props, */
} from 'react-select';
import { components } from 'react-select';
import { MdClose } from 'react-icons/md';
import { Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useState } from 'react';
import chroma from 'chroma-js';
import { cn } from '@/utils/utils';

const controlStyles = {
  base: 'block px-2.5 w-full text-base font-medium bg-base-100 border placeholder:opacity-0 appearance-none peer disabled:cursor-not-allowed transition-colors duration-300 rounded-sm text-base-content placeholder:text-base-content/50 hover:border-base-content disabled:border-base-content/40',
  focus: 'ring-1 ring-base-content',
  nonFocus: 'border-base-content/50',
  disabled: 'cursor-not-allowed	opacity-40',
  error: 'border-error/50 hover:border-error ring-error',
};
const selectInputStyles = '';
const valueContainerStyles = 'gap-1 mt-3 mb-2';
const singleValueStyles = '';
const multiValueStyles =
  'bg-primary rounded items-center h-6 py-0.5 pl-2 pr-1 gap-1.5';
const multiValueLabelStyles =
  'font-medium text-primary-content leading-6 py-0.5';
const multiValueRemoveStyles =
  'border border-gray-200 bg-white hover:bg-error hover:text-error-content text-gray-500 hover:border-error rounded-md';
const indicatorsContainerStyles = 'pl-1 gap-1';
const clearIndicatorStyles =
  'text-error-content/70 p-1 rounded-md bg-error/70 hover:bg-error hover:text-error-content';
const indicatorSeparatorStyles = 'bg-base-100';
const menuStyles =
  'z-10 mb-2.5 p-1 mt-1 border border-base-content/20 bg-base-100 rounded-md animate-in fade-in duration-500';
const groupHeadingStyles = 'ml-3 mt-2 mb-1 font-bold text-md';
const optionStyles = {
  base: 'hover:cursor-pointer my-1 px-6 py-2 rounded',
  focus: 'bg-base-content text-base-100',
  selected: 'bg-primary text-primary-content',
};
const noOptionsMessageStyles =
  'text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm';

const colorStyles: StylesConfig<any> = {
  input: (base) => ({
    ...base,
    'input:focus': {
      boxShadow: 'none',
    },
  }),
  control: (base) => ({
    ...base,
    minHeight: 48,
    transition: 'none',
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white',
    },
  }),
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
    whiteSpace: 'normal',
    overflow: 'visible',
  }),
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? chroma.contrast(color, 'white') > 2
          ? 'white'
          : 'black'
        : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',
      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
};

const selectStyles: StylesConfig<any> = {
  input: (base) => ({
    ...base,
    'input:focus': {
      boxShadow: 'none',
    },
  }),
  control: (base) => ({
    ...base,
    minHeight: 48,
    transition: 'none',
  }),
  // override that behaviour.
  multiValueLabel: (styles) => ({
    ...styles,
    whiteSpace: 'normal',
    overflow: 'visible',
  }),
};

const ClearIndicator = (props: ClearIndicatorProps) => {
  return (
    <components.ClearIndicator {...props}>
      <MdClose />
    </components.ClearIndicator>
  );
};

const MultiValueRemove = (props: MultiValueRemoveProps) => {
  return (
    <components.MultiValueRemove {...props}>
      <MdClose />
    </components.MultiValueRemove>
  );
};

const Control = (props: any) => {
  const {
    isFocused,
    isDisabled,
    selectProps: { menuIsOpen, isError },
  } = props;
  return (
    <div>
      <components.Control
        className={cn(
          controlStyles.base,
          isFocused ? controlStyles.focus : controlStyles.nonFocus,
          isDisabled ? controlStyles.disabled : '',
          isError ? controlStyles.error : ''
        )}
        {...props}
      />
      <span
        className={cn(
          'absolute text-base font-medium duration-300 transform -translate-y-4 translate-x-1 scale-75 top-1 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-x-0 peer-focus:translate-x-1 peer-focus:top-1 peer-focus:font-semibold peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 peer-disabled:text-opacity-40 rounded-sm ',
          isError
            ? 'text-error/60 peer-hover:text-error'
            : 'text-base-content/60 peer-hover:text-base-content peer-focus:text-base-content peer-disabled:peer-hover:text-base-content/60',
          isFocused
            ? isError
              ? 'text-error'
              : 'text-base-content'
            : isError
            ? 'text-error/50'
            : 'text-base-content/50',
          isDisabled ? 'cursor-not-allowed text-opacity-40' : '',
          menuIsOpen ? (isError ? 'text-error' : 'text-base-content') : ''
        )}
      >
        {props.selectProps?.label}
      </span>
    </div>
  );
};

const DropdownIndicator = (props: any) => {
  const {
    selectProps: { menuIsOpen, isError },
  } = props;
  return (
    <components.DropdownIndicator
      {...props}
      className={cn(
        'p-1 bg-base-300 hover:text-base-300 rounded-md',
        isError ? 'hover:bg-error text-error' : 'hover:bg-base-content',
        menuIsOpen
          ? isError
            ? 'bg-error text-error-content'
            : 'bg-base-content text-base-300'
          : ''
      )}
    ></components.DropdownIndicator>
  );
};

const Placeholder = (props: any) => {
  const {
    selectProps: { isError },
  } = props;
  return (
    <components.Placeholder
      {...props}
      className={cn(isError ? 'text-error' : 'text-base-content/50')}
    ></components.Placeholder>
  );
};

export interface InputMultipleSelectFOProps extends Props {
  id: string;
  name: string;
  options: any;
  control: any;
  label: string;
  setValue: any;
  isError?: any;
  color?: boolean;
  multipleError?: boolean;
}

const InputMultipleSelectFO = ({
  id,
  name,
  value,
  control,
  options = {},
  label,
  placeholder,
  setValue,
  color = false,
  multipleError = false,
  ...props
}: InputMultipleSelectFOProps) => {
  const [opts, setOpts] = useState(options);
  return (
    <div className='relative box-border'>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value, name, ref, ...rest },
          formState: { errors },
        }: any) => {
          if (errors[name]) {
            props.isError = true;
          } else {
            props.isError = false;
          }
          return (
            <>
              <Select
                id={id}
                inputId={name}
                closeMenuOnSelect={false}
                blurInputOnSelect={false}
                hideSelectedOptions={false}
                unstyled
                isMulti
                menuPlacement='auto'
                name={name}
                ref={ref}
                value={value}
                options={opts}
                onChange={onChange}
                label={label}
                placeholder={placeholder}
                onCreateOption={(inputValue: any) => {
                  const newOption = {
                    label: inputValue,
                    value: uuidv4(),
                  };
                  setOpts([...opts, newOption]);
                  setValue(name, [...value, newOption]);
                }}
                styles={color ? colorStyles : selectStyles}
                components={{
                  ClearIndicator,
                  MultiValueRemove,
                  Control,
                  DropdownIndicator,
                  Placeholder,
                }}
                classNames={{
                  input: () => selectInputStyles,
                  valueContainer: () => valueContainerStyles,
                  singleValue: () => singleValueStyles,
                  multiValue: () => multiValueStyles,
                  multiValueLabel: () => multiValueLabelStyles,
                  multiValueRemove: () => multiValueRemoveStyles,
                  indicatorsContainer: () => indicatorsContainerStyles,
                  clearIndicator: () => clearIndicatorStyles,
                  indicatorSeparator: () => indicatorSeparatorStyles,
                  menu: () => menuStyles,
                  groupHeading: () => groupHeadingStyles,
                  option: ({ isFocused, isSelected }: any) =>
                    cn(
                      isFocused && !color && optionStyles.focus,
                      isSelected && optionStyles.selected,
                      optionStyles.base
                    ),
                  noOptionsMessage: () => noOptionsMessageStyles,
                }}
                {...props}
                {...rest}
              />
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
                  render={({ message }) => (
                    <p className='text-error'>{message}</p>
                  )}
                />
              )}
            </>
          );
        }}
      />
    </div>
  );
};

InputMultipleSelectFO.displayName = 'InputMultipleSelectFO';

export { InputMultipleSelectFO };