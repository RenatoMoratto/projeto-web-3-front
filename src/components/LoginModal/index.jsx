import { useContext, useState } from "react";
import AuthContext from "../../contexts/auth";
import Modal from "../Modal";
import Input from "../Input";
import Message from "../Message";
import styles from "./login.module.css";

function LoginModal({ onClose }) {
	const { login, register } = useContext(AuthContext);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [validation, setValidation] = useState([]);
	const [isLogin, setIsLogin] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const submitHandler = async e => {
		e.preventDefault();

		setError("");
		setSuccess("");
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
			setIsLoading(true);

			try {
				if (isLogin) {
					await login({ email, password });
					setSuccess("User logged in with success!");
				} else {
					await register({ name, email, password });
					setSuccess("User register with success!");
				}
			} catch (error) {
				setError(error);
			}
			setIsLoading(false);
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
				{error.length > 0 && <Message>{error}</Message>}
				{success.length > 0 && <Message error={false}>{success}</Message>}

				<button disabled={isLoading} className="btn" type="submit">
					{!isLoading && (isLogin ? "Login" : "Register")}
					{isLoading && "Loading..."}
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
