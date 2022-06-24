import { useState } from "react";
const SearchBar = () => {
	const [totQuotes, setTotQuotes] = useState(3);
	return (
		<form className="search-bar">
			<div>
				<label for="totQuotes">Total of quotes:</label>
				<input id="totQuotes" type="number" value={totQuotes} onChange={setTotQuotes} min="1" max="500" />
			</div>
			<div>
				<button id="randomQuote" className="btn">
					Random quote
				</button>
				<button className="btn" type="submit">
					Search
				</button>
			</div>
		</form>
	);
};
export default SearchBar;
