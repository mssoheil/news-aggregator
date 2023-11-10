import React from "react";
// Styles
import styles from "./index.module.scss";
// Assets
import searchIcon from "../../../../assets/images/search-icon.svg";

export const Search = () => {
	return (
		<div className={styles.search}>
			<div className={styles["search__wrapper"]}>
				<img alt="magnifying glass" src={searchIcon} width={22} height={22} />
				<input className={styles["wrapper__input"]} />
			</div>
		</div>
	);
};
