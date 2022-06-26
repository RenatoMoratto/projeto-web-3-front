import { useContext } from "react";
import AuthContext from "../contexts/auth";

export default function HeaderButton(props) {
	const { estaLogado } = useContext(AuthContext);
	return (
		<button className="login btn" onClick={props.onClick}>
			{estaLogado ? "Logout" : "Login"}
		</button>
	);
}
