import styles from "./error.module.css";
export default function ErrorMessage({ children }) {
	return <p className={styles.invalid}>{children}</p>;
}
