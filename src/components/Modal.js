import { useEffect } from "react";
import styles from "./StylesModules/Modal.module.css";

function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    // Bloqueia o scroll do body enquanto o modal estiver aberto
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.modal_overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={styles.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.modal_close}
          onClick={onClose}
          aria-label="Fechar modal"
        >
          &times;
        </button>
        {title && <h2 className={styles.modal_title}>{title}</h2>}
        {children}
      </div>
    </div>
  );
}

export default Modal;

