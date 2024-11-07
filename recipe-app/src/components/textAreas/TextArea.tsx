import { InputHTMLAttributes } from "react";

type Props = Omit<InputHTMLAttributes<HTMLTextAreaElement>, "className"> & {
	label?: string;
	labelClassName?: string;
	error?: string;
	errorClassName?: string;
	textAreaClassName?: string;
	touched?: boolean;
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
				{...props}
				className={`textArea ${textAreaClassName}`}
				id={name}
				name={name}
			/>
			{error && <p className={`error ${errorClassName}`}>{error}</p>}
		</label>
	);
}

export default TextArea;
