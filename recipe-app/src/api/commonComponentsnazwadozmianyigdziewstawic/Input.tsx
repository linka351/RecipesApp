import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
	name: string;
	label?: string;
	labelClassName?: string;
	error?: string;
	errorClassName?: string;
	type?: string;
};

function Input({
	name,
	label,
	labelClassName,
	error,
	errorClassName,
	type,
	...props
}: Props) {
	return (
		<label className={labelClassName}>
			{label}
			<input name={name} {...props} type={type} />
			{error && <p className={errorClassName}>{error}</p>}
		</label>
	);
}

export default Input;
