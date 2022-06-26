import styles from "./modal.module.css";

function Modal({ onClose, children }) {
	return (
		<>
			<div className={styles.backdrop} />
			<div className={styles.modal}>
				<div className={styles["close-button"]}>
					<span onClick={onClose}>&times;</span>
				</div>
				<div>{children}</div>
			</div>
		</>
	);
}

export default Modal;
