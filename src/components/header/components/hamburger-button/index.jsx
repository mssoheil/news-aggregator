import { useContext } from "react";
// Components
import { MenuContent } from "../menu-content";
// Styles
import styles from "./index.module.scss";
import { Store } from "../../../main-page";

export const HamburgerButton = () => {
	const { setIsCategoryMenuOpened } = useContext(Store);

	function handleOpenMenu() {
		setIsCategoryMenuOpened(true);
	}

	function handleCloseMenu() {
		setIsCategoryMenuOpened(false);
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
			<MenuContent onClose={handleCloseMenu} />
		</div>
	);
};
