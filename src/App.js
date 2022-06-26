import { useContext, useEffect, useState } from "react";
import AuthContext from "./contexts/auth";
import LoginModal from "./components/LoginModal";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Quotes from "./pages/Quotes";

function App() {
	const { estaLogado, logout } = useContext(AuthContext);
	const [showModal, setShowModal] = useState(false);
	
	const showModalHandler = () => setShowModal(true);

	useEffect(() => {
		if (estaLogado) {
			setShowModal(false);
		}
	}, [estaLogado]);

	return (
		<>
			{showModal && <LoginModal onClose={() => setShowModal(false)} />}
			<Header onClick={estaLogado ? logout : showModalHandler} />
			{!estaLogado && <Home />}
			{estaLogado && <Quotes />}
			<Footer />
		</>
	);
}

export default App;
