type Props = {
	placeholder: string;
	name: string;
	onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	value: string;
	touched: boolean;
	errors: string;
};

function TextArea(props: Props) {
	return (
		<div className='recipe-box'>
			<textarea
				className='recipe-description'
				placeholder={props.placeholder}
				name={props.name}
				onChange={props.onChange}
				value={props.value}
			/>
			<div className='add-recipe-error'>{props.touched && props.errors}</div>
		</div>
	);
}

export default TextArea;
