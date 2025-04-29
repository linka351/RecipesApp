import "./switch.scss";

type Props = {
	isPrivate: boolean;
	handleToggleChange: () => void;
};
function Switch({ isPrivate, handleToggleChange }: Props) {
	return (
		<div className='toggle-container'>
			<span className='toggle-label'>Wszystkie</span>
			<label className='switch'>
				<input
					type='checkbox'
					checked={isPrivate}
					onChange={handleToggleChange}
				/>
				<span className='slider round'></span>
			</label>
			<span className='toggle-label'>Prywatne</span>
		</div>
	);
}

export default Switch;
