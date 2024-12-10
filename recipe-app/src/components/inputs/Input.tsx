import { forwardRef, InputHTMLAttributes } from "react";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "className"> & {
	label?: string;
	labelClassName?: string;
	error?: string;
	errorClassName?: string;
	inputClassName?: string;
	touched?: boolean;
};

const Input = forwardRef<HTMLInputElement, Props>(function Input(
	{
		name,
		label,
		labelClassName,
		error,
		errorClassName,
		inputClassName,
		touched,
		...props
	},
	ref
) {
	return (
		<label htmlFor={name} className={`label ${labelClassName}`}>
			{label}
			<input
				{...props}
				ref={ref}
				className={`input ${inputClassName}`}
				id={name}
				name={name}
			/>
			{touched && error && <p className={`error ${errorClassName}`}>{error}</p>}
		</label>
	);
});

export default Input;
