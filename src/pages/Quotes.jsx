import { useEffect, useState } from "react";
import Quote from "../components/Quote";
import "../style/quotes.css";

function Quotes() {
	const [quotes, setQuotes] = useState([]);
	const [totQuotes, setTotQuotes] = useState(3);
	const [param, setParam] = useState("");
	const [search, setSearch] = useState(true);

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
			<section className="search-bar">
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
				<div className="btns">
					<button
						id="randomQuote"
						className="btn"
						onClick={() => {
							setParam("/random");
							setSearch(prevState => !prevState);
						}}
					>
						Random quote
					</button>
					<button
						className="btn"
						type="submit"
						onClick={() => {
							setParam(`?count=${totQuotes}`);
							setSearch(prevState => !prevState);
						}}
					>
						Search
					</button>
				</div>
			</section>
			<main className="quotes">
				{quotes.map((quote, i) => (
					<Quote key={quote.author + i} en={quote.en} author={quote.author} />
				))}
			</main>
		</>
	);
}

export default Quotes;
