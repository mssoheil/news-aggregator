import React from "react";
// Components
import { Menu } from "./components/menu";
import { Search } from "./components/search";
// Styles
import styles from "./index.module.scss";

export const Header = () => {
	return (
		<div className={styles["header"]}>
			<Menu />
			<Search />
		</div>
	);
};
