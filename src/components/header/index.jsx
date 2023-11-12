import React from "react";
// Components
import { Menu } from "./components/menu";
import { Input } from "../input";
import { Search } from "./components/search";
import { FilterIcon } from "../icons";
// Styles
import styles from "./index.module.scss";

export const Header = ({
	isFilterVisible,
	setIsFilterVisible,
	fromDate,
	toDate,
	source,
	keyword,
	onFromDateChange,
	onKeywordChange,
	onToDateChange,
	onSourceChange,
}) => {
	function handleToggleVisible() {
		setIsFilterVisible((isFilterVisible) => !isFilterVisible);
	}

	return (
		<div className={styles.header}>
			<Menu />
			<div className={styles["header__filter-section"]}>
				<Search value={keyword} onChange={onKeywordChange} />
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
				<Input type="date" onChange={onFromDateChange} value={fromDate}>
					From:
				</Input>
				<Input type="date" onChange={onToDateChange} value={toDate}>
					To:
				</Input>
				<Input type="text" onChange={onSourceChange} value={source}>
					Source:
				</Input>
			</div>
		</div>
	);
};
