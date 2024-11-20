import {
	type Control,
	Controller,
	type FieldValues,
	useWatch,
} from 'react-hook-form';
import {
	InputAttributes,
	NumericFormat,
	NumericFormatProps,
} from 'react-number-format';
import { cn } from '@/utils/utils';
import { colorVariants, styles } from '../Theme/InputStyles';
import { ErrorMessageAdapter } from './error-message-adapter';
import { TooltipResponsive } from '../ui';

export interface InputNumberFOProps
	extends NumericFormatProps<InputAttributes> {
	label?: string;
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
	control: Control<FieldValues> | any;
	classNameLabel?: string;
	classNameWrapper?: string;
	property?: 'integer';
	rounded?: string;
	placeholder?: string;
	multipleError?: boolean;
	alignTooltipDesktop?: 'center' | 'end' | 'start';
	alignTooltipMobile?: 'center' | 'end' | 'start';
	tooltip?: boolean;
	textTooltip?: string;
	calculate?: (values: number[]) => number;
	fields?: string[];
	required?: boolean;
	isString?: boolean;
}

const InputNumberFO = ({
	className,
	classNameLabel,
	classNameWrapper,
	color = 'default',
	control,
	id,
	label,
	multipleError = false,
	name,
	rounded = 'rounded-lg',
	textTooltip,
	alignTooltipDesktop,
	alignTooltipMobile,
	tooltip = false,
	calculate,
	fields = [],
	isString = false,
	required = false,
	...props
}: InputNumberFOProps) => {
	console.log('Render InputNumberFO ', name);

	let valueCalculate: number = 0,
		calculated = false;

	const valuesWatch = useWatch({ control, name: fields, exact: true });
	if (calculate) {
		valueCalculate = calculate(valuesWatch) || 0;
		calculated = true;
	}

	return (
		<div className={`w-full ${classNameWrapper}`}>
			<Controller
				name={name}
				control={control}
				render={({
					field: { value, onChange, ref, ...rest },
					formState: { errors },
				}) => {
					const isError = getValueByPath(errors, name);
					return (
						<>
							<div className={cn('bg-inherit relative', className)}>
								{tooltip ? (
									<TooltipResponsive
										className="flex place-items-center absolute text-blue-gray-500 top-2/4 right-3 -translate-y-2/4 w-5 h-5"
										alignDesktop={alignTooltipDesktop}
										alignMobile={alignTooltipMobile}
										textTooltip={textTooltip}
									/>
								) : (
									<></>
								)}
								<NumericFormat
									id={id}
									value={calculated ? valueCalculate : value}
									onValueChange={(values) => {
										isString
											? onChange(values.value)
											: onChange(values.floatValue);
									}}
									{...rest}
									{...props}
									getInputRef={ref}
									className={cn(
										styles.input,
										className,
										rounded,
										{ 'pr-9': tooltip },
										isError
											? colorVariants.error.input
											: colorVariants[color].input,
									)}
								/>
								<label
									htmlFor={id}
									className={cn(
										styles.label,
										rounded,
										classNameLabel,
										isError
											? colorVariants.error.label
											: colorVariants[color].label,
									)}
								>
									{label}
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
InputNumberFO.displayName = 'InputNumberFO';

export { InputNumberFO };
const getValueByPath = (obj: any, path: string) => {
	if (!path) return undefined;
	const keys = path.split('.');
	let result = obj;

	for (const key of keys) {
		if (result[key] !== undefined) {
			result = result[key];
		} else {
			return undefined;
		}
	}

	return result;
};
