import React, { useContext } from "react";
// Components
import { Menu } from "./components/menu";
import { Search } from "./components/search";
import { FilterIcon } from "../icons";
import { FilterSection } from "./components/filter-section";
// Styles
import styles from "./index.module.scss";
import { Store } from "../main-page";

export const Header = () => {
	const { onCategorySelect, isFilterVisible, setIsFilterVisible } =
		useContext(Store);

	function handleToggleVisible() {
		setIsFilterVisible((isFilterVisible) => !isFilterVisible);
	}

	return (
		<div className={styles.header}>
			<Menu onCategorySelect={onCategorySelect} />
			<div className={styles["header__filter-section"]}>
				<Search />
				<button
					onClick={handleToggleVisible}
					className={`${styles["filter-section__filter-icon"]} ${
						isFilterVisible
							? styles["filter-section__filter-icon--visible"]
							: ""
					}`}
				>
					<FilterIcon />
				</button>
			</div>
			<div
				className={`${styles["header__filter-content"]} ${
					isFilterVisible ? styles["header__filter-content--visible"] : ""
				}`}
			>
				<FilterSection />
			</div>
		</div>
	);
};
