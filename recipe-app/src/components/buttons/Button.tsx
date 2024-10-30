import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	isSubmitting: boolean;
	disabled?: boolean;
	children?: React.ReactNode;
	type?: string;
	className?: string;
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
