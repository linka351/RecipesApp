import { ReactNode } from "react";
import { createPortal } from "react-dom";

const portals = document.getElementById("portals")!;

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  text?: string;
};

const Modal = ({ isOpen, onClose, children, text }: ModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal">
      <div className="modal-content">
        {text && <h2 className="modal-text">{text}</h2>}
        <button onClick={onClose} className="modal-close">
          X
        </button>
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    portals
  );
};

export default Modal;
