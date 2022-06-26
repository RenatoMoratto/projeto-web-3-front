import { useContext, useState } from "react";
import AuthContext from "../../contexts/auth";
import ErrorMessage from "../ErrorMessage";
import Modal from "../Modal";
import styles from "./login.module.css";

function LoginModal({ setShowModal }) {
	const { login } = useContext(AuthContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [validation, setValidation] = useState([]);

	const submitHandler = async e => {
		e.preventDefault();

		setValidation([]);
		const invalidFields = [];

		if (!email || email.length < 3) {
			invalidFields.push("email");
		}
		if (!password || password.length < 3) {
			invalidFields.push("password");
		}
		setValidation(invalidFields);

		if (invalidFields.length === 0) {
			login({ email, password });
		}
	};

	return (
		<Modal title="Login" onClose={() => setShowModal(false)}>
			<form id="form" onSubmit={submitHandler}>
				<div className={styles["input-group"]}>
					<label htmlFor="email">Email</label>
					<input
						className={validation.includes("email") ? styles.invalid : ""}
						value={email}
						onChange={e => setEmail(e.target.value)}
						id="email"
						type="email"
					/>
					{validation.includes("email") && <ErrorMessage>Insert a valid email address</ErrorMessage>}
				</div>
				<div className={styles["input-group"]}>
					<label htmlFor="senha">Senha</label>
					<input
						className={validation.includes("password") ? styles.invalid : ""}
						value={password}
						onChange={e => setPassword(e.target.value)}
						id="senha"
						type="password"
					/>
					{validation.includes("password") && <ErrorMessage>Insert a valid password</ErrorMessage>}
				</div>
				<button className="btn" type="submit">
					Enviar
				</button>
			</form>
		</Modal>
	);
}

export default LoginModal;
