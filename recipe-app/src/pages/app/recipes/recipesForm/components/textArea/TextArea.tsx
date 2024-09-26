type Props = {
	name: string;
	onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	value: string;
	touched: boolean;
	errors: string;
};

function TextArea({ name, onChange, value, touched, errors }: Props) {
	return (
		<>
			<div className='recipe-label'>
				<label className='label'>Opis przepisu</label>
				<textarea
					className='recipe-description'
					name={name}
					onChange={onChange}
					value={value}
				/>
			</div>
			<div className='recipe-error'>{touched && errors}</div>
		</>
	);
}

export default TextArea;
