export default function HeaderLink({ title, onClick }) {
	const pageLink = title.toLowerCase();
	return (
		<a href={`#${pageLink}`} onClick={() => onClick(pageLink)}>
			{title}
		</a>
	);
}
