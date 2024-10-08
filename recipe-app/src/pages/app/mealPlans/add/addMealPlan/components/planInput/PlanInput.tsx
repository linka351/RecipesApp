import "./planInput.scss";

interface PlanInputProps {
	name: string;
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function PlanInput({ name, value, onChange }: PlanInputProps) {
	return (
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
	);
}

export default PlanInput;
