import { useContext } from "react";
// Components
import { MenuContent } from "../menu-content";
import { Drawer } from "@components/drawer";
// Styles
import styles from "./index.module.scss";
// Store
import { Store } from "@components/main-page";
// Assets
import menuIcon from "@root/assets/images/menu-icon.svg";

export const HamburgerButton = () => {
	const {
		onCategorySelect,
		isCategoryMenuOpened,
		setIsCategoryMenuOpened,
		category: selectedCategory,
	} = useContext(Store);

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
				<img src={menuIcon} alt="menu-icon" width={30} height={30} />
			</button>
			<Drawer isOpen={isCategoryMenuOpened} onClose={handleCloseMenu}>
				<MenuContent
					onClose={handleCloseMenu}
					selectedCategory={selectedCategory}
					onCategorySelect={onCategorySelect}
				/>
			</Drawer>
		</div>
	);
};
