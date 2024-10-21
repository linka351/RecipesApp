import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLTextAreaElement> & {
	name: string;
	label?: string;
	labelClassName?: string;
	error?: string;
	errorClassName?: string;
};

function TextArea({
	name,
	label,
	labelClassName,
	error,
	errorClassName,
	...props
}: Props) {
	return (
		<label className={labelClassName}>
			{label}
			<textarea name={name} {...props} />
			{error && <p className={errorClassName}>{error}</p>}
		</label>
	);
}

export default TextArea;
