type Props = {
	placeholder: string;
	name: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
	touched: boolean;
	errors: string;
};

function Input({ placeholder, name, onChange, value, touched, errors }: Props) {
	return (
		<div className='recipe-box'>
			<input
				className='recipe-input'
				type='text'
				placeholder={placeholder}
				name={name}
				onChange={onChange}
				value={value}
			/>
			<div className='recipe-error'>{touched && errors}</div>
		</div>
	);
}

export default Input;
