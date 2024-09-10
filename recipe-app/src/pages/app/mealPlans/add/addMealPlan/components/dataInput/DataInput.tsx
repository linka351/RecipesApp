import { InputHTMLAttributes } from "react";

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
		<label className={labelClassName}>
			{label}
			<input name={name} {...props} type={type} />
			{error && <div className={errorClassName}>{error}</div>}
		</label>
	);
}

export default DataInput;
