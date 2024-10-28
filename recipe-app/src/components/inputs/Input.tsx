import { InputHTMLAttributes } from "react";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "className"> & {
	name: string;
	label?: string;
	labelClassName?: string;
	error?: string;
	errorClassName?: string;
	inputClassName?: string;
};

function Input({
	name,
	label,
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
			{error && <p className={`error ${errorClassName}`}>{error}</p>}
		</label>
	);
}

export default Input;
