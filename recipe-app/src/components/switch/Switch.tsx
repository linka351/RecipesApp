import "./switch.scss";

type Props = {
	showPrivate: boolean;
	handleToggleChange: () => void;
};
function Switch({ showPrivate, handleToggleChange }: Props) {
	return (
		<div className='toggle-container'>
			<span className='toggle-label'>Wszystkie</span>
			<label className='switch'>
				<input
					type='checkbox'
					checked={showPrivate}
					onChange={handleToggleChange}
				/>
				<span className='slider round'></span>
			</label>
			<span className='toggle-label'>Prywatne</span>
		</div>
	);
}

export default Switch;
