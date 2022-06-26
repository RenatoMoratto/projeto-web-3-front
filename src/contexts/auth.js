import React, { createContext, useState } from "react";

const AuthContext = createContext({
	token: "",
	estaLogado: false,
	login: ({ email, password }) => {},
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

	const LoginHandler = ({ email, password }) => {
		fetch(`${process.env.REACT_APP_API_KEY}/login`, {
			method: "POST",
			headers: new Headers({ "Content-Type": "application/json" }),
			body: JSON.stringify({ email, password }),
		})
			.then(response => response.json())
			.then(data => {
				console.log(data)
				if (data.message) {
					alert(data.message);
					return;
				}
				localStorage.setItem("token", JSON.stringify(data.access_token));
				setToken(data.access_token);
			})
			.catch(error => alert(error));
	};

	const contextValue = {
		token,
		estaLogado: usuarioEstaLogado,
		login: LoginHandler,
		logout: LogoutHandler,
	};

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;
