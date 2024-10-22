import { InputHTMLAttributes } from "react";

type Props = Omit<InputHTMLAttributes<HTMLTextAreaElement>, "className"> & {
	name: string;
	label?: string;
	labelClassName?: string;
	error?: string;
	errorClassName?: string;
	textAreaClassName?: string;
};

function TextArea({
	name,
	label,
	labelClassName,
	error,
	errorClassName,
	textAreaClassName,
	...props
}: Props) {
	return (
		<label htmlFor={name} className={`label ${labelClassName}`}>
			{label}
			<textarea
				className={`textArea ${textAreaClassName}`}
				id={name}
				name={name}
				{...props}
			/>
			{error && <p className={`error ${errorClassName}`}>{error}</p>}
		</label>
	);
}

export default TextArea;
