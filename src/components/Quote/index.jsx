import "./quote.module.css";

function Quote({ en, author }) {
	return (
		<blockquote>
			{en}
			<br />
			<cite>{author}</cite>
		</blockquote>
	);
}

export default Quote;
