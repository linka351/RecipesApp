interface PlanTextAreaProps {
	name: string;
	value: string;
	onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function PlanTextArea({ name, value, onChange }: PlanTextAreaProps) {
	return (
		<label className='label'>
			Opis Planu
			<textarea
				name={name}
				className='plan-input plan-input-description'
				value={value}
				onChange={onChange}
			/>
		</label>
	);
}

export default PlanTextArea;
