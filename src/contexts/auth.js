import React, { createContext, useState } from "react";
import { apiUrl } from "../api";

const AuthContext = createContext({
	token: "",
	user: { name: "", email: "", id: "" },
	isLoggedIn: false,
	login: ({ email, password }) => {},
	register: ({ username, email, password }) => {},
	logout: () => {},
});

export const AuthProvider = ({ children }) => {
	const initialToken = localStorage.getItem("token");
	const initialUser = localStorage.getItem("user");

	const [token, setToken] = useState(initialToken);
	const [user, setUser] = useState(JSON.parse(initialUser));

	const isLoggedIn = !!token;

	const LogoutHandler = () => {
		setToken("");
		setUser({});
		localStorage.removeItem("token");
		localStorage.removeItem("user");
	};

	const getUser = async (email, token) => {
		try {
			const response = await fetch(`${apiUrl}/user?email=${email}`, {
				headers: new Headers({ Authorization: `Bearer ${token}` }),
			});

			const data = await response.json();

			if (response.status >= 200 && response.status < 300) {
				localStorage.setItem("user", JSON.stringify(data));
				setUser(data);
				return;
			}
			alert(data.message);
		} catch (error) {
			alert(error);
		}
	};

	const LoginHandler = async ({ email, password }) => {
		try {
			const response = await fetch(`${apiUrl}/login`, {
				method: "POST",
				headers: new Headers({ "Content-Type": "application/json" }),
				body: JSON.stringify({ email, password }),
			});

			const data = await response.json();

			if (response.status >= 200 && response.status < 300) {
				getUser(email, data.access_token);
				localStorage.setItem("token", JSON.stringify(data.access_token));
				setToken(data.access_token);
				return;
			}

			alert(data.message);
		} catch (error) {
			alert(error);
		}
	};

	const RegisterHandler = async ({ name, email, password }) => {
		try {
			const response = await fetch(`${apiUrl}/register`, {
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
		} catch (error) {
			alert(error);
		}
	};

	const contextValue = {
		token,
		user,
		isLoggedIn: isLoggedIn,
		login: LoginHandler,
		register: RegisterHandler,
		logout: LogoutHandler,
	};

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;
