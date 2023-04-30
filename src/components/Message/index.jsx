import styles from "./message.module.css";

export default function Message({ children, error = true }) {
	const style = error ? styles.error : styles.success;
	return <p className={style}>{children}</p>;
}
