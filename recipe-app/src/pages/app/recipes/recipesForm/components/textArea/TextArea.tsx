type Props = {
	placeholder: string;
	name: string;
	onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	value: string;
	touched: boolean;
	errors: string;
};

function TextArea({
	placeholder,
	name,
	onChange,
	value,
	touched,
	errors,
}: Props) {
	return (
		<div className='recipe-box'>
			<textarea
				className='recipe-description'
				placeholder={placeholder}
				name={name}
				onChange={onChange}
				value={value}
			/>
			<div className='add-recipe-error'>{touched && errors}</div>
		</div>
	);
}

export default TextArea;
