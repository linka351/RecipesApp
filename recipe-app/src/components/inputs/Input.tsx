import { forwardRef, InputHTMLAttributes, useState } from "react";
import "./input.scss";
import clsx from "clsx";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import Button from "../buttons/Button";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "className"> & {
	label?: string;
	labelClassName?: string;
	error?: string;
	errorClassName?: string;
	inputClassName?: string;
	touched?: boolean;
	showPasswordIcon?: boolean;
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
		showPasswordIcon,
		type = "text",
		...props
	},
	ref
) {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const labelClass = clsx("label", labelClassName);
	const inputClass = clsx("input", inputClassName);
	const errorClass = clsx("error", errorClassName);

	const handleTogglePassword = () => setIsPasswordVisible(prev => !prev);

	return (
		<div>
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
					type={
						showPasswordIcon ? (isPasswordVisible ? "text" : "password") : type
					}
				/>

				{showPasswordIcon && (
					<Button
						type='button'
						className='password'
						onClick={handleTogglePassword}>
						{isPasswordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
					</Button>
				)}
				{touched && error && <p className={errorClass}>{error}</p>}
			</div>
		</div>
	);
});

export default Input;
