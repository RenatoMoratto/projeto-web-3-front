import React, { createContext, useState } from "react";

const AuthContext = createContext({
	token: "",
	isLoggedIn: false,
	login: ({ email, password }) => {},
	register: ({ username, email, password }) => {},
	logout: () => {},
});

export const AuthProvider = ({ children }) => {
	const tokenInicial = localStorage.getItem("token");

	const [token, setToken] = useState(tokenInicial);

	const usuarioEstaLogado = !!token;

	const LogoutHandler = () => {
		setToken("");
		localStorage.removeItem("token");
	};

	const LoginHandler = async ({ email, password }) => {
		const response = await fetch(`${process.env.REACT_APP_API_KEY}/login`, {
			method: "POST",
			headers: new Headers({ "Content-Type": "application/json" }),
			body: JSON.stringify({ email, password }),
		});
		const data = await response.json();

		if (response.status >= 200 && response.status < 300) {
			localStorage.setItem("token", JSON.stringify(data.access_token));
			setToken(data.access_token);
			return;
		}
		
		alert(data.message);
	};

	const RegisterHandler = async ({ name, email, password }) => {
		const response = await fetch(`${process.env.REACT_APP_API_KEY}/register`, {
			method: "POST",
			headers: new Headers({ "Content-Type": "application/json" }),
			body: JSON.stringify({ name, email, password }),
		});

		const data = await response.json();

		if (response.status === 201) {
			localStorage.setItem("token", JSON.stringify(data.access_token));
			setToken(data.access_token);
		}

		alert(data.message);
	};

	const contextValue = {
		token,
		estaLogado: usuarioEstaLogado,
		login: LoginHandler,
		register: RegisterHandler,
		logout: LogoutHandler,
	};

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;
