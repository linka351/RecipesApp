import { InputHTMLAttributes } from "react";
import "./dateInput.scss";

type Props = InputHTMLAttributes<HTMLInputElement> & {
	name: string;
	label?: string;
	labelClassName?: string;
	errors?: string;
	errorsClassName?: string;
	type?: string;
	touched?: boolean;
};

function DateInput({
	label,
	labelClassName,
	errors,
	errorsClassName,
	type,
	name,
	touched,
	...props
}: Props) {
	return (
		<div className='data-container'>
			<label className='data-label'>
				{label}
				<input className='data-input' name={name} {...props} type={type} />
				<div className={errorsClassName}>{touched && errors}</div>
			</label>
		</div>
	);
}

export default DateInput;
