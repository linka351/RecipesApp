interface PlanInputProps {
	value: string;
	onChange: (newValue: string) => void;
}

function PlanInput({ value, onChange }: PlanInputProps) {
	return (
		<label className='label'>
			Nazwa Planu
			<input
				type='text'
				className='plan-input'
				value={value}
				onChange={e => onChange(e.target.value)}
			/>
		</label>
	);
}

export default PlanInput;
