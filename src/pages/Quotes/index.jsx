import { useContext, useEffect, useState } from "react";
import Quote from "../../components/Quote";
import SearchBar from "../../components/SearchBar";
import Message from "../../components/Message";
import styles from "./quotes.module.css";
import AuthContext from "../../contexts/auth";
import { apiUrl } from "../../api";

function Quotes() {
	const { token } = useContext(AuthContext);
	const [quotes, setQuotes] = useState([]);
	const [totQuotes, setTotQuotes] = useState(3);
	const [param, setParam] = useState("");
	const [search, setSearch] = useState(true);
	const [error, setError] = useState("");

	const searchHandler = () => {
		setParam(`?count=${totQuotes}`);
		setSearch(prevState => !prevState);
	};

	const searchRandomHandler = () => {
		setParam("/random");
		setSearch(prevState => !prevState);
	};

	useEffect(() => {
		async function getQuotes() {
			setError("");
			try {
				const response = await fetch(`${apiUrl}/quotes${param}`, {
					headers: new Headers({ Authorization: `Bearer ${token}` }),
				});
				const data = await response.json();

				setQuotes(data);
			} catch (error) {
				setError(error.message);
			}
		}

		getQuotes();
	}, [search, param, token]);

	return (
		<>
			<SearchBar
				onSearch={searchHandler}
				searchInputs={
					<div>
						<label htmlFor="totQuotes">Total of quotes:</label>
						<input
							id="totQuotes"
							type="number"
							value={totQuotes}
							onChange={e => setTotQuotes(e.target.value)}
							min="1"
							max="500"
						/>
					</div>
				}
				leftButtons={
					<button id="randomQuote" className="btn" onClick={searchRandomHandler}>
						Random quote
					</button>
				}
			/>
			{error.length > 0 && <Message>{error}</Message>}

			<main className={styles.quotes}>
				{quotes.length === 0 && <p>No quotes registered.</p>}
				{quotes.length > 0 &&
					quotes.map(quote => <Quote key={quote._id} en={quote.en} author={quote.author} />)}
			</main>
		</>
	);
}

export default Quotes;
