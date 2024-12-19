import { ButtonHTMLAttributes } from "react";
import "./button.scss";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	isSubmitting?: boolean;
};
const Button = ({
	isSubmitting,
	disabled,
	children,
	type,
	className,
	...props
}: Props) => {
	return (
		<button
			className={`button ${className}`}
			type={type}
			disabled={isSubmitting || disabled}
			{...props}>
			{isSubmitting ? <span className='loader'>Loading...</span> : children}
		</button>
	);
};

export default Button;
