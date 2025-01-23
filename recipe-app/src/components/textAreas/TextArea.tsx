import { InputHTMLAttributes } from "react";
import "./textArea.scss";
import clsx from "clsx";

type Props = Omit<InputHTMLAttributes<HTMLTextAreaElement>, "className"> & {
	label?: string;
	labelClassName?: string;
	error?: string;
	errorClassName?: string;
	textareaClassName?: string;
	touched?: boolean;
};

function TextArea({
	name,
	label,
	touched,
	labelClassName,
	error,
	errorClassName,
	textareaClassName,
	...props
}: Props) {
	const labelClass = clsx("label", labelClassName);
	const textareaClass = clsx("textarea", textareaClassName);
	const errorClass = clsx("textarea-error", errorClassName);
	return (
		<label htmlFor={name} className={labelClass}>
			<span className='textarea-text'>{label}</span>
			<div className='textarea-container'>
				<textarea {...props} className={textareaClass} id={name} name={name} />
				{touched && error && <p className={errorClass}>{error}</p>}
			</div>
		</label>
	);
}

export default TextArea;
