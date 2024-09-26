type Props = {
	name: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
	touched: boolean;
	errors: string;
};

function Input({ name, onChange, value, touched, errors }: Props) {
	return (
		<>
			<div className='recipe-label'>
				<label className='label'>Nazwa przepisu</label>

				<input
					className='recipe-input'
					type='text'
					name={name}
					onChange={onChange}
					value={value}
				/>
			</div>
			<div className='recipe-error'>{touched && errors}</div>
		</>
	);
}

export default Input;
