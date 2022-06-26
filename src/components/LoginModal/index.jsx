import { useContext, useState } from "react";
import AuthContext from "../../contexts/auth";
import Modal from "../Modal";
import Input from "../Input";
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
					<Input
						value={name}
						setValue={setName}
						id="name"
						label="Username"
						errorMessage="Insert a valid username"
						autoComplete="username"
						type="name"
						isInvalid={validation.includes("name")}
					/>
				)}
				<Input
					value={email}
					setValue={setEmail}
					id="email"
					label="E-mail"
					errorMessage="Insert a valid email address"
					autoComplete="email"
					type="email"
					isInvalid={validation.includes("email")}
				/>
				<Input
					value={password}
					setValue={setPassword}
					id="password"
					label="Password"
					errorMessage="Insert a valid password"
					autoComplete="current-password"
					type="password"
					isInvalid={validation.includes("password")}
				/>
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
