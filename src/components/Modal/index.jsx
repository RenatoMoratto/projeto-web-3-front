import styles from "./modal.module.css";

function Modal({ title, onClose, children }) {
	return (
		<>
			<div className={styles.backdrop} />
			<div className={styles.modal}>
				<div className={styles["close-button"]}>
					<span onClick={onClose}>&times;</span>
				</div>
				<h1>{title}</h1>
				<div>{children}</div>
			</div>
		</>
	);
}

export default Modal;
