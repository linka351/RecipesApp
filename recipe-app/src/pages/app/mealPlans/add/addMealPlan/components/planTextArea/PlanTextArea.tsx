interface PlanTextAreaProps {
	name: string;
	value: string;
	onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	touched: boolean;
	errors: string;
}

function PlanTextArea({
	name,
	value,
	onChange,
	touched,
	errors,
}: PlanTextAreaProps) {
	return (
		<>
			<label className='label'>
				Opis Planu
				<textarea
					name={name}
					className='plan-input plan-input-description'
					value={value}
					onChange={onChange}
				/>
			</label>
			<div className='recipe-error'>{touched && errors}</div>
		</>
	);
}

export default PlanTextArea;
