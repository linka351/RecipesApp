import { ButtonHTMLAttributes } from "react";
import "./button.scss";
import clsx from "clsx";
import Loader from "../loader/Loader";

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
	const buttonClass = clsx("button", className);
	return (
		<button
			className={buttonClass}
			type={type}
			disabled={isSubmitting || disabled}
			{...props}>
			{isSubmitting ? <Loader /> : children}
		</button>
	);
};

export default Button;
