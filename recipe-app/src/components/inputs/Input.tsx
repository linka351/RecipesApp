import { InputHTMLAttributes } from "react";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "className"> & {
	label?: string;
	labelClassName?: string;
	error?: string;
	errorClassName?: string;
	inputClassName?: string;
	touched?: boolean;
};

function Input({
	name,
	label,
	touched,
	labelClassName,
	error,
	errorClassName,
	inputClassName,
	...props
}: Props) {
	return (
		<label htmlFor={name} className={`label ${labelClassName}`}>
			{label}
			<input
				{...props}
				className={`input ${inputClassName}`}
				id={name}
				name={name}
			/>
			{touched && error && <p className={`error ${errorClassName}`}>{error}</p>}
		</label>
	);
}

export default Input;
