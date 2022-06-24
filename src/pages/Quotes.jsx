import { useState } from "react";
import Quote from "../components/Quote";
import "../style/quotes.css";

function Quotes() {
	const [quotes] = useState([]);

	return (
		<main>
			<main className="quotes">
				{quotes.map(quote => (
					<Quote en={quote.en} author={quote.author} />
				))}
			</main>
		</main>
	);
}

export default Quotes;
