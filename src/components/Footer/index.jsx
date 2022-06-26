import styles from "./footer.module.css";

function Footer() {
	return (
		<footer>
			<a href="https://github.com/vercel/next.js/blob/canary/license.md" target="_blank" rel="noreferrer">
				License: MIT
			</a>
			<a href="https://github.com/RenatoMoratto" target="_blank" rel="noreferrer" className={styles.link}>
				GitHub
			</a>
		</footer>
	);
}

export default Footer;
