import styles from "./notification.module.css";

function Notification() {
	return (
		<section className={styles.notification}>
			<a href="#next-12.1">
				<span className={styles.highlight}>New</span>
				<span className={styles.br}></span>
				<b>Next.js 12.1</b>: Including on-demand ISR, support for styled-components and Relay, and our first
				developer survey →
			</a>
		</section>
	);
}

export default Notification;
