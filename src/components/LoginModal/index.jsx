import { useContext, useState } from "react";
import AuthContext from "../../contexts/auth";
import ErrorMessage from "../ErrorMessage";
import Modal from "../Modal";
import styles from "./login.module.css";

function LoginModal({ onClose }) {
	const { login, register } = useContext(AuthContext);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [validation, setValidation] = useState([]);
	const [isLogin, setIsLogin] = useState(true);

	const submitHandler = async e => {
		e.preventDefault();

		setValidation([]);
		const invalidFields = [];

		if (!isLogin && (!name || name.length < 3)) {
			invalidFields.push("name");
		}
		if (!email || email.length < 3) {
			invalidFields.push("email");
		}
		if (!password || password.length < 3) {
			invalidFields.push("password");
		}
		setValidation(invalidFields);

		if (invalidFields.length === 0) {
			isLogin ? login({ email, password }) : register({ name, email, password });
		}
	};

	return (
		<Modal title={isLogin ? "Login" : "New Account"} onClose={onClose}>
			<form id="form" onSubmit={submitHandler}>
				{!isLogin && (
					<div className={styles["input-group"]}>
						<label htmlFor="name">Username</label>
						<input
							className={validation.includes("name") ? styles.invalid : ""}
							value={name}
							onChange={e => setName(e.target.value)}
							autoComplete="username"
							id="name"
							type="name"
						/>
						{validation.includes("name") && <ErrorMessage>Insert a valid username</ErrorMessage>}
					</div>
				)}
				<div className={styles["input-group"]}>
					<label htmlFor="email">E-mail</label>
					<input
						className={validation.includes("email") ? styles.invalid : ""}
						value={email}
						autoComplete="email"
						onChange={e => setEmail(e.target.value)}
						id="email"
						type="email"
					/>
					{validation.includes("email") && <ErrorMessage>Insert a valid email address</ErrorMessage>}
				</div>
				<div className={styles["input-group"]}>
					<label htmlFor="senha">Password</label>
					<input
						className={validation.includes("password") ? styles.invalid : ""}
						value={password}
						autoComplete="current-password"
						onChange={e => setPassword(e.target.value)}
						id="senha"
						type="password"
					/>
					{validation.includes("password") && <ErrorMessage>Insert a valid password</ErrorMessage>}
				</div>
				<button className="btn" type="submit">
					{isLogin ? "Login" : "Register"}
				</button>
				<div>
					<p>
						{isLogin ? "New here?" : "Already have an account?"}
						<a
							href={isLogin ? "#register" : "#login"}
							className={styles.signin}
							onClick={() => setIsLogin(prevState => !prevState)}
						>
							{isLogin ? "Sign in" : "Login"}
						</a>
					</p>
				</div>
			</form>
		</Modal>
	);
}

export default LoginModal;
