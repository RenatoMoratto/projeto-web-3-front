import { useEffect, useState } from "react";
import Quote from "../../components/Quote";
import SearchBar from "../../components/SearchBar";
import styles from "./quotes.module.css";

function Quotes() {
	const [quotes, setQuotes] = useState([]);
	const [totQuotes, setTotQuotes] = useState(3);
	const [param, setParam] = useState("");
	const [search, setSearch] = useState(true);

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
			try {
				const response = await fetch(`${process.env.REACT_APP_API_KEY}/quotes${param}`);
				const data = await response.json();

				setQuotes(data);
			} catch (error) {
				alert(error.message);
			}
		}

		getQuotes();
	}, [search, param]);

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
				searchButtons={
					<button id="randomQuote" className="btn" onClick={searchRandomHandler}>
						Random quote
					</button>
				}
			/>
			<main className={styles.quotes}>
				{quotes.map(quote => (
					<Quote key={quote._id} en={quote.en} author={quote.author} />
				))}
			</main>
		</>
	);
}

export default Quotes;
