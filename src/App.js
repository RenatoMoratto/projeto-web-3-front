import { useContext, useEffect, useState } from "react";
import AuthContext from "./contexts/auth";
import LoginModal from "./components/LoginModal";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Quotes from "./pages/Quotes";
import Posts from "./pages/Posts";

function App() {
	const { isLoggedIn, logout } = useContext(AuthContext);
	const [showModal, setShowModal] = useState(false);
	const [page, setPage] = useState("home");

	const hideModalHandler = () => setShowModal(false);
	const showModalHandler = () => setShowModal(true);
	const changePageHandler = page => setPage(page);

	useEffect(() => {
		if (isLoggedIn) {
			setShowModal(false);
		}
	}, [isLoggedIn]);

	return (
		<>
			{showModal && <LoginModal onClose={hideModalHandler} />}
			<Header onLoginClick={isLoggedIn ? logout : showModalHandler} onPageChange={changePageHandler} />
			{(!isLoggedIn || page === "home") && <Home />}
			{isLoggedIn && (
				<>
					{page === "quotes" && <Quotes />}
					{page === "posts" && <Posts />}
				</>
			)}
			<Footer />
		</>
	);
}

export default App;
