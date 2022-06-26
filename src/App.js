import { useContext, useState } from "react";
import AuthContext from "./contexts/auth";
import LoginModal from "./components/LoginModal";
import Header from "./components/Header";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Quotes from "./pages/Quotes";

function App() {
	const { token } = useContext(AuthContext);
	const [showModal, setShowModal] = useState(false);
	return (
		<>
			{showModal && <LoginModal onClose={() => setShowModal(false)} />}
			<Header setShowModal={setShowModal} />
			<Notification />
			{!token && <Home />}
			{token && <Quotes />}
			<Footer />
		</>
	);
}

export default App;
