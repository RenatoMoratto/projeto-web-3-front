import fallbackImage from "../../assets/imgs/fallback-image.png";
import styles from "./post.module.css";

function Post({ title, text, file, user }) {
	return (
		<div className={styles.card}>
			<div className={styles["card-header"]}>
				<img src={file ? file : fallbackImage} alt="" width="600" />
			</div>
			<div className={styles["card-body"]}>
				<h4>{title}</h4>
				<p>{text}</p>
			</div>
			<div className={styles["card-footer"]}>
				<h5 className={styles.user}>User: {user}</h5>
			</div>
		</div>
	);
}

export default Post;
