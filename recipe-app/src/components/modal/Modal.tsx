import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

import "./modal.scss";
import Button from "../buttons/Button";

const portals = document.getElementById("portals")!;

type Props = {
	close: () => void;
	children: ReactNode;
	headerText?: string;
};

const Modal = ({ close, children, headerText }: Props) => {
	useEffect(() => {
		document.documentElement.classList.add("no-scroll");

		return () => {
			document.documentElement.classList.remove("no-scroll");
		};
	}, []);

	const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			close();
		}
	};

	return createPortal(
		<div className='modal' onClick={handleBackgroundClick}>
			<div className='modal-content'>
				{headerText && <h2 className='modal-text'>{headerText}</h2>}
				<Button onClick={close} className='modal-close'>
					X
				</Button>
				<div className='modal-body'>{children}</div>
			</div>
		</div>,
		portals
	);
};

export default Modal;
