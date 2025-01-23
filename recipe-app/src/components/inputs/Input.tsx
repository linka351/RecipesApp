import { forwardRef, InputHTMLAttributes } from "react";
import "./input.scss";
import clsx from "clsx";

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
	const labelClass = clsx("label", labelClassName);
	const inputClass = clsx("input", inputClassName);
	const errorClass = clsx("error", errorClassName);
	return (
		<>
			{label && (
				<label htmlFor={name} className={labelClass}>
					<span className='label-text'>{label}</span>
				</label>
			)}
			<div className='input-container'>
				<input
					{...props}
					ref={ref}
					className={inputClass}
					id={name}
					name={name}
				/>
				{touched && error && <p className={errorClass}>{error}</p>}
			</div>
		</>
	);
});

export default Input;
