import ErrorMessage from "../ErrorMessage";
import styles from "./input.module.css";

function Input({ id, label, errorMessage, isInvalid, value, setValue, type, ...rest }) {
	return (
		<div className={styles["input-group"]}>
			<label htmlFor={id}>{label}</label>
			{type === "textarea" ? (
				<textarea
					className={isInvalid ? styles.invalid : ""}
					value={value}
					onChange={e => setValue(e.target.value)}
					id={id}
					{...rest}
				/>
			) : (
				<input
					className={isInvalid ? styles.invalid : ""}
					value={value}
					onChange={e => setValue(e.target.value)}
					id={id}
					{...rest}
				/>
			)}
			{isInvalid && <ErrorMessage>{errorMessage}</ErrorMessage>}
		</div>
	);
}

export default Input;
