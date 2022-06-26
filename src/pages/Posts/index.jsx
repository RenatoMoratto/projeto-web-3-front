import { useContext, useEffect, useState } from "react";
import Post from "../../components/Post";
import SearchBar from "../../components/SearchBar";
import NewPostModal from "../../components/NewPostModal";
import AuthContext from "../../contexts/auth";
import { apiUrl } from "../../api";

import styles from "./posts.module.css";

function Posts() {
	const { token } = useContext(AuthContext);
	const [posts, setPosts] = useState([]);
	const [param, setParam] = useState("");
	const [title, setTitle] = useState("");
	const [search, setSearch] = useState(true);
	const [showModal, setShowModal] = useState(false);

	const searchHandler = () => {
		setParam("");
		setSearch(prevState => !prevState);
	};
	const searchByTitleHandler = () => {
		if (!title) {
			setParam("");
			setSearch(prevState => !prevState);
			return;
		}
		setParam(`?title=${title}`);
		setSearch(prevState => !prevState);
	};
	const showModalHandler = () => setShowModal(true);
	const hideModalHandler = () => setShowModal(false);

	useEffect(() => {
		async function getPosts() {
			try {
				const response = await fetch(`${apiUrl}/posts${param}`, {
					headers: new Headers({ Authorization: `Bearer ${token}` }),
				});
				const data = await response.json();

				setPosts(data);
			} catch (error) {
				alert(error);
			}
		}

		getPosts();
	}, [search, param, token]);

	return (
		<>
			{showModal && <NewPostModal onClose={hideModalHandler} onSearch={searchHandler} />}
			<SearchBar
				onSearch={searchByTitleHandler}
				searchInputs={
					<div>
						<label htmlFor="title">Title:</label>
						<input
							id="title"
							value={title}
							onChange={e => setTitle(e.target.value)}
							style={{ width: "10rem" }}
						/>
					</div>
				}
				rightButtons={
					<button className={`${styles.new} btn`} onClick={showModalHandler}>
						New post
					</button>
				}
			/>
			<main className={styles.posts}>
				{posts.length === 0 && <p>No posts registered.</p>}
				{posts.length > 0 &&
					posts.map((post, i) => (
						<Post
							key={post._id}
							title={post.title}
							text={post.text}
							file={post.filepath}
							user={post.user}
						/>
					))}
			</main>
		</>
	);
}

export default Posts;
