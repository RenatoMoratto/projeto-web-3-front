import { useContext } from "react";
import AuthContext from "../../contexts/auth";

export default function HeaderButton(props) {
	const { isLoggedIn } = useContext(AuthContext);
	return (
		<button className="login btn" onClick={props.onClick}>
			{isLoggedIn ? "Logout" : "Login"}
		</button>
	);
}
