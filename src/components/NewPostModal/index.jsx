import { useContext, useState } from "react";
import AuthContext from "../../contexts/auth";
import Modal from "../Modal";
import Input from "../Input";
import { apiUrl } from "../../api";
import styles from "./new-post.module.css";

function LoginModal({ onClose, onSearch }) {
	const { token, user } = useContext(AuthContext);
	const [title, setTitle] = useState("");
	const [text, setText] = useState("");
	const [file, setFile] = useState("");
	const [fileUrl, setFileUrl] = useState("");
	const [validation, setValidation] = useState([]);

	const handleFileChange = e => {
		const fileList = e.target.files;
		if (!fileList) {
			return;
		} else {
			setFile(fileList[0]);
			setFileUrl(URL.createObjectURL(fileList[0]));
		}
	};

	const submitHandler = async e => {
		e.preventDefault();

		setValidation([]);
		const invalidFields = [];

		if (!title || title.length < 3) {
			invalidFields.push("name");
		}
		if (!text || text.length < 3) {
			invalidFields.push("text");
		}
		setValidation(invalidFields);

		if (invalidFields.length === 0) {
			const formdata = new FormData();
			formdata.append("title", title);
			formdata.append("text", text);
			formdata.append("file", file, file.name);
			formdata.append("user", user.id);

			try {
				const response = await fetch(`${apiUrl}/post`, {
					method: "POST",
					headers: new Headers({ Authorization: `Bearer ${token}` }),
					body: formdata,
				});

				if (response.statusCode >= 200 && response.statusCode < 300) {
					alert("Post created successfully");
					onSearch();
					onClose();
				}
			} catch (error) {
				alert(error.message);
			}
		}
	};

	return (
		<Modal title="New Post" onClose={onClose}>
			<form id="form" onSubmit={submitHandler}>
				<Input
					value={title}
					setValue={setTitle}
					id="title"
					label="Title"
					errorMessage="Insert a valid title"
					autoComplete="title"
					type="title"
					isInvalid={validation.includes("title")}
				/>
				<Input
					value={text}
					setValue={setText}
					id="text"
					label="Content"
					errorMessage="Insert some content"
					type="text"
					isInvalid={validation.includes("text")}
				/>
				{fileUrl !== "" && <img src={fileUrl} width="200rem" alt="" />}
				<div className={styles["input-group"]}>
					<label htmlFor={text}>Image</label>
					<input onChange={handleFileChange} id={text} type="file" />
				</div>
				<button className="btn" type="submit">
					Save post
				</button>
			</form>
		</Modal>
	);
}

export default LoginModal;
