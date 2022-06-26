import { useContext, useEffect, useState } from "react";
import AuthContext from "./contexts/auth";
import LoginModal from "./components/LoginModal";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Quotes from "./pages/Quotes";

function App() {
	const { isLoggedIn, logout } = useContext(AuthContext);
	const [showModal, setShowModal] = useState(false);

	const showModalHandler = () => setShowModal(true);

	useEffect(() => {
		if (isLoggedIn) {
			setShowModal(false);
		}
	}, [isLoggedIn]);

	return (
		<>
			{showModal && <LoginModal onClose={() => setShowModal(false)} />}
			<Header onClick={isLoggedIn ? logout : showModalHandler} />
			{!isLoggedIn && <Home />}
			{isLoggedIn && <Quotes />}
			<Footer />
		</>
	);
}

export default App;
