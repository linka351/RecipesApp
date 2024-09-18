interface PlanTextAreaProps {
	name: string;
	value: string;
	onChange: (newValue: string) => void;
}

function PlanTextArea({ name, value, onChange }: PlanTextAreaProps) {
	return (
		<label className='label'>
			Opis Planu
			<textarea
				name={name}
				className='plan-input plan-input-description'
				value={value}
				onChange={e => onChange(e.target.value)}
			/>
		</label>
	);
}

export default PlanTextArea;
