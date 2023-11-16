import React, { useContext } from "react";
import cn from "classnames";
// Components
import { Menu } from "./components/menu";
import { Search } from "./components/search";
import { FilterIcon } from "../icons";
import { FilterSection } from "./components/filter-section";
// Styles
import styles from "./index.module.scss";
// Store
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
					className={cn(styles["filter-section__filter-icon"], {
						[styles["filter-section__filter-icon--visible"]]: isFilterVisible,
					})}
				>
					<FilterIcon />
				</button>
			</div>
			<div
				className={cn(styles["header__filter-content"], {
					[styles["header__filter-content--visible"]]: isFilterVisible,
				})}
			>
				<FilterSection />
			</div>
		</div>
	);
};
