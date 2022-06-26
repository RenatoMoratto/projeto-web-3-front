import { useEffect, useState } from "react";
import Post from "../../components/Post";
import SearchBar from "../../components/SearchBar";

import styles from "./posts.module.css";

function Posts() {
	const [posts, setPosts] = useState([]);
	const [param, setParam] = useState("");
	const [search, setSearch] = useState(true);

	const searchHandler = () => {
		setParam("");
		setSearch(prevState => !prevState);
	};
	const searchRandomHandler = () => {
		setParam("/random");
		setSearch(prevState => !prevState);
	};

	useEffect(() => {
		async function getPosts() {
			try {
				const response = await fetch(`${process.env.REACT_APP_API_KEY}/posts${param}`);
				const data = await response.json();

				if (data.length > 0) {
					setPosts(data);
				}
			} catch (error) {
				alert(error.message);
			}
		}

		getPosts();
	}, [search, param]);

	return (
		<>
			<SearchBar
				onSearch={searchHandler}
				searchButtons={
					<button className="btn" onClick={searchRandomHandler}>
						Random post
					</button>
				}
			/>
			<main className={styles.posts}>
				{posts.map((post, i) => (
					<Post key={post._id} title={post.title} text={post.text} file={post.filepath} user={post.user} />
				))}
			</main>
		</>
	);
}

export default Posts;
