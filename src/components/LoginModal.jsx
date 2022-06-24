import { useContext, useState } from "react";
import AuthContext from "../contexts/auth";
import "../style/modal.css";

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

		try {
			const response = await fetch(`${process.env.REACT_APP_API_KEY}/login`, {
				method: "POST",
				headers: new Headers({ "Content-Type": "application/json" }),
				body: JSON.stringify({ email, password }),
			});
			const data = await response.json();

			if (response.status === 200) {
				login(data.access_token);
				setShowModal(false);
			} else {
				throw new Error(data.error);
			}
		} catch (error) {
			alert(error.message);
		}
	};

	return (
		<div className="modal">
			<form id="form" onSubmit={submitHandler}>
				<span className="close-button" onClick={() => setShowModal(false)}>
					&times;
				</span>
				<h1>Login</h1>
				<div className="input-group">
					<label htmlFor="email">Email</label>
					<input value={email} onChange={setEmail} id="email" type="email" />
					{validation.includes("email") && <p className="invalid-text">Insert a valid email address</p>}
				</div>
				<div className="input-group">
					<label htmlFor="senha">Senha</label>
					<input value={password} onChange={setPassword} id="senha" type="password" />
					{validation.includes("password") && (
						<p className="invalid-text">The password must be at least 3 characters long</p>
					)}
				</div>
				<button className="btn" type="submit">
					Enviar
				</button>
			</form>
		</div>
	);
}

export default LoginModal;
