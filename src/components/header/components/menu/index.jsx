import React from "react";
// Components
import { Preference } from "../preference";
import { HamburgerButton } from "../hamburger-button";
// Styles
import styles from "./index.module.scss";

export const Menu = () => {
	return (
		<div className={styles.menu}>
			<div className={styles["menu__logo"]}>NEWSLY</div>
			<div className={styles["menu__icons"]}>
				<Preference />
				<HamburgerButton />
			</div>
		</div>
	);
};
