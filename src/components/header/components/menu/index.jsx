import React from "react";
// Components
import { HamburgerButton } from "../hamburger-button";
import { Preference } from "../preference";
// Styles
import styles from "./index.module.scss";

export const Menu = ({ onCategorySelect }) => {
	return (
		<div className={styles.menu}>
			<div className={styles["menu__logo"]}>NEWSLY</div>
			<div className={styles["menu__icons"]}>
				<Preference />
				<HamburgerButton onCategorySelect={onCategorySelect} />
			</div>
		</div>
	);
};
