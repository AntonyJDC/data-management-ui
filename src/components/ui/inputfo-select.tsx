// import { CSSProperties } from 'react';
import Select, {
  ClearIndicatorProps,
  MultiValueRemoveProps,
  Props,
} from 'react-select';
import { components } from 'react-select';
import { MdClose } from 'react-icons/md';
import { cn } from '@/utils/utils';

// focus:ring-1 focus:placeholder:opacity-100 focus:outline-none focus:border-base-content focus:ring-base-content

const controlStyles = {
  base: 'block px-2.5 w-full text-base font-medium  border placeholder:opacity-0 appearance-none peer disabled:cursor-not-allowed transition-colors duration-300 rounded-lg text-base-content placeholder:text-base-content/50 hover:border-base-content disabled:border-base-content/40',
  focus: 'ring-1 ring-base-content',
  nonFocus: 'border-base-content/50',
  disabled: 'cursor-not-allowed	opacity-40',
  error: 'border-error/50 hover:border-error ring-error',
};
const selectInputStyles = '';
const valueContainerStyles = 'pt-1';
const singleValueStyles = '';
const multiValueStyles =
  'bg-primary rounded items-center py-0.5 pl-2 pr-1 gap-1.5';
const multiValueLabelStyles = 'leading-6 py-0.5';
const multiValueRemoveStyles =
  'border border-gray-200 bg-white hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-sm';
const indicatorsContainerStyles = '';
const clearIndicatorStyles =
  'text-gray-500 p-1 rounded-sm hover:bg-red-50 hover:text-red-800';
const indicatorSeparatorStyles = '';
const groupHeadingStyles = 'mx-1 mt-2 mb-1 font-bold text-md';
const optionStyles = {
  base: 'hover:cursor-pointer my-1 px-4 py-2 rounded',
  focus: 'bg-base-content text-base-100',
  selected: 'bg-primary text-primary-content',
};
const noOptionsMessageStyles =
  'text-base-content/50 p-2 border border-dashed border-base-content/20 rounded-sm';

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
    <>
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
          'absolute text-base font-medium duration-300 transform -translate-y-4 translate-x-1.5 scale-75 top-1 origin-[0] bg-inherit px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-x-0 peer-focus:translate-x-1.5 peer-focus:top-1 peer-focus:font-semibold peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 peer-disabled:text-opacity-40 rounded-lg ',
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
        {props.selectProps?.label}{' '}
        <span
          className={cn(
            'text-error',
            props.selectProps?.required ? '' : 'hidden'
          )}
        >
          {' *'}
        </span>
      </span>
    </>
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
      className={cn('truncate',isError ? 'text-error' : 'text-base-content/50')}
    ></components.Placeholder>
  );
};

const Menu = ({ children, ...rest }: any) => {
  return (
    <components.Menu
      className={cn(
        'mb-2.5 p-1 mt-1 border border-base-content/30 bg-inherit bg-base-100 rounded-md animate-in fade-in duration-500 '
      )}
      {...rest}
    >
      {children}
    </components.Menu>
  );
};
export interface InputSelectFOProps extends Props {
  id: string;
  name: string;
  options: any;
  isError?: any;
  label: string;
  ref?: any;
  multipleError?: boolean;
  classNameWrapper?: string;
  required?: boolean;
  isModalOnBlur?: boolean;
}
const InputSelectFO = ({
  id,
  name,
  value,
  options = {},
  ref,
  placeholder,
  multipleError = false,
  isModalOnBlur = false,
  className = 'bg-inherit',
  classNameWrapper,
  ...props
}: InputSelectFOProps) => {
  return (
    <div className={cn('relative box-border', classNameWrapper)}>
      <Select
        id={id}
        inputId={id}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        blurInputOnSelect={false}
        unstyled
        menuPlacement='auto'
        name={name}
        ref={ref}
        value={value}
        options={options}
        placeholder={placeholder}
        className={className}
        styles={{
          input: (base) => ({
            ...base,
            'input:focus': {
              boxShadow: 'none',
            },
          }),
          multiValueLabel: (base) => ({
            ...base,
            whiteSpace: 'normal',
            overflow: 'visible',
          }),
          control: (base) => ({
            ...base,
            minHeight: 48,
            transition: 'none',
          }),
        }}
        components={{
          ClearIndicator,
          MultiValueRemove,
          Control,
          DropdownIndicator,
          Placeholder,
          Menu,
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
          groupHeading: () => groupHeadingStyles,
          option: ({ isFocused, isSelected }) => {
            return cn(
              isFocused && optionStyles.focus,
              isSelected && optionStyles.selected,
              optionStyles.base
            );
          },
          noOptionsMessage: () => noOptionsMessageStyles,
        }}
        {...props}
      />
    </div>
  );
};

InputSelectFO.displayName = 'InputSelectFO';

export { InputSelectFO };
