type Props = {
	isSubmitting: boolean;
	disabled?: boolean;
	children?: React.ReactNode;
};
const SubmitButton = ({ isSubmitting, disabled, children }: Props) => {
	return (
		<button type='submit' disabled={isSubmitting || disabled}>
			{isSubmitting ? <span className='loader'>Loading...</span> : children}
		</button>
	);
};

export default SubmitButton;
