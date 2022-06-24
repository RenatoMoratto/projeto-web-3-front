import { useEffect, useState } from "react";
import Quote from "../components/Quote";
import "../style/quotes.css";

function Quotes() {
	const [quotes, setQuotes] = useState([]);
	const [totQuotes, setTotQuotes] = useState(3);
	const [param, setParam] = useState("");

	const submitHandler = e => {};

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
	}, [param]);

	return (
		<>
			<form className="search-bar" onSubmit={submitHandler}>
				<div>
					<label for="totQuotes">Total of quotes:</label>
					<input id="totQuotes" type="number" value={totQuotes} onChange={setTotQuotes} min="1" max="500" />
				</div>
				<div>
					<button id="randomQuote" className="btn" onClick={() => setParam("random")}>
						Random quote
					</button>
					<button className="btn" type="submit" onClick={() => setParam(`?count=${totQuotes}`)}>
						Search
					</button>
				</div>
			</form>
			<main className="quotes">
				{quotes.map(quote => (
					<Quote en={quote.en} author={quote.author} />
				))}
			</main>
		</>
	);
}

export default Quotes;
