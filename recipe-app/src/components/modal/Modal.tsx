import { ReactNode } from "react";


type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
	text?: string;
};

const Modal = ({ isOpen, onClose, children, text }: ModalProps) => {
	if (!isOpen) return null;

	return (
		<div className='modal'>
			<div className='modal-content'>
				{text && <h2 className='modal-text'>{text}</h2>}
				<button onClick={onClose} className='modal-close'>
					X
				</button>
				<div className='modal-body'>{children}</div>
			</div>
		</div>
	);
};

export default Modal;
