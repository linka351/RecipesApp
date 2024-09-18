import "./planInput.scss";

interface PlanInputProps {
	name: string;
	value: string;
	onChange: (newValue: string) => void;
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
				onChange={e => onChange(e.target.value)}
			/>
		</label>
	);
}

export default PlanInput;
