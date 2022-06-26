import styles from "./search-bar.module.css";

function SearchBar({ onSearch, searchInputs, searchButtons }) {
	return (
		<section className={styles["search-bar"]}>
			{searchInputs && searchInputs}
			<div className={styles.btns}>
				{searchButtons && searchButtons}
				<button className="btn" onClick={onSearch}>
					Search
				</button>
			</div>
		</section>
	);
}

export default SearchBar;
