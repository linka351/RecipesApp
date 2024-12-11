import { ReactNode } from "react";
import { createPortal } from "react-dom";

import "./modal.scss";

const portals = document.getElementById("portals")!;

type Props = {
	close: () => void;
	children: ReactNode;
	headerText?: string;
};

const Modal = ({ close, children, headerText }: Props) => {
	const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			close();
		}
	};

	return createPortal(
		<div className='modal' onClick={handleBackgroundClick}>
			<div className='modal-content'>
				{headerText && <h2 className='modal-text'>{headerText}</h2>}
				<button onClick={close} className='modal-close'>
					X
				</button>
				<div className='modal-body'>{children}</div>
			</div>
		</div>,
		portals
	);
};

export default Modal;
