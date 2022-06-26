import styles from "./search-bar.module.css";

function SearchBar({ onSearch, searchInputs, leftButtons, rightButtons }) {
	return (
		<section className={styles["search-bar"]}>
			{searchInputs && searchInputs}
			<div className={styles.btns}>
				{leftButtons && leftButtons}
				<button className="btn" onClick={onSearch}>
					Search
				</button>
				{rightButtons && rightButtons}
			</div>
		</section>
	);
}

export default SearchBar;
