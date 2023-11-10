import { useState } from "react";
// Components
import { MenuContent } from "../menu-content";
// Styles
import styles from "./index.module.scss";

export const HamburgerButton = (props) => {
	const [isOpened, setIsOpened] = useState(false);

	function handleOpenMenu() {
		setIsOpened(true);
	}

	function handleCloseMenu() {
		setIsOpened(false);
	}

	return (
		<div className={styles["hamburger-menu"]}>
			<button
				className={styles["hamburger-menu__menu-button"]}
				onClick={handleOpenMenu}
			>
				<span className={styles["menu-button__line"]} />
				<span className={styles["menu-button__line"]} />
				<span className={styles["menu-button__line"]} />
			</button>
			<MenuContent isOpened={isOpened} onClose={handleCloseMenu} />
		</div>
	);
};
