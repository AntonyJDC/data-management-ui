import * as React from 'react';
import { type Control, type FieldValues } from 'react-hook-form';
import { cn } from '@/utils/utils';
import { colorVariants, styles } from '../Theme/InputStyles';
import { Controller } from 'react-hook-form';
import { ErrorMessageAdapter } from './error-message-adapter';

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
	control: Control<FieldValues> | undefined;
	required?: boolean;
	tooltip?: boolean;
	textTooltip?: string;
}

const Textarea = ({
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
}: InputProps) => {
	return (
		<div className={`w-full ${classNameWrapper}`}>
			<Controller
				name={name}
				control={control}
				render={({ field: { value, ...rest }, formState: { errors } }) => {
					return (
						<>
							<div className="relative">
								<textarea
									id={id}
									className={cn(
										styles.input,
										className,
										rounded,
										errors[name]
											? colorVariants.error.input
											: colorVariants[color].input,
									)}
									placeholder={placeholder}
									value={value || ''}
									{...rest}
								/>
								<label
									htmlFor={id}
									className={cn(
										styles.textAreaLabel,
										rounded,
										classNameLabel,
										errors[name]
											? colorVariants.error.label
											: colorVariants[color].label,
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

Textarea.displayName = 'Textarea';

export { Textarea };
