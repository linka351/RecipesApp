import "./planInput.scss";

interface PlanInputProps {
	name: string;
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	touched: boolean;
	errors: string;
}

function PlanInput({ name, value, onChange, touched, errors }: PlanInputProps) {
	return (
		<>
			<label className='label'>
				Nazwa Planu
				<input
					name={name}
					type='text'
					className='plan-input'
					value={value}
					onChange={onChange}
				/>
			</label>
			<div className='recipe-error'>{touched && errors}</div>
		</>
	);
}

export default PlanInput;
