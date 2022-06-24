import React, { createContext, useState } from "react";

const AuthContext = createContext({
	token: "",
	estaLogado: false,
	login: token => {},
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

	const LoginHandler = token => {
		localStorage.setItem("token", JSON.stringify(token));
		setToken(token);
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
