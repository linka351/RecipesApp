type Props = {
	placeholder: string;
	name: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
	touched: boolean;
	errors: string;
};

function Input(props: Props) {
	return (
		<div className='recipe-box'>
			<input
				className='add-recipe-input'
				type='text'
				placeholder={props.placeholder}
				name={props.name}
				onChange={props.onChange}
				value={props.value}
			/>
			<div className='add-recipe-error'>{props.touched && props.errors}</div>
		</div>
	);
}

export default Input;
