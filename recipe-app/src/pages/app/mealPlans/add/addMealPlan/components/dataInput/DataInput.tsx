import { InputHTMLAttributes } from "react";
import "./dataInput.scss";

type Props = InputHTMLAttributes<HTMLInputElement> & {
	name: string;
	label?: string;
	labelClassName?: string;
	error?: string;
	errorClassName?: string;
	type?: string;
};

function DataInput({
	label,
	labelClassName,
	error,
	errorClassName,
	type,
	name,
	...props
}: Props) {
	return (
		<div className='data-container'>
			<label className='data-label'>
				{label}
				<input className='data-input' name={name} {...props} type={type} />
				{error && <div className={errorClassName}>{error}</div>}
			</label>
		</div>
	);
}

export default DataInput;
