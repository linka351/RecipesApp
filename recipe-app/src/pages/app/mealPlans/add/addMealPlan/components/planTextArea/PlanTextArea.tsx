interface PlanTextAreaProps {
	value: string;
	onChange: (newValue: string) => void;
}

function PlanTextArea({ value, onChange }: PlanTextAreaProps) {
	return (
		<label className='label'>
			Opis Planu
			<textarea
				className='plan-input plan-input-description'
				value={value}
				onChange={e => onChange(e.target.value)}
			/>
		</label>
	);
}

export default PlanTextArea;
