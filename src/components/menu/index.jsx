// Components
import { MenuContent } from "./components/menu-content";
// Styles
import styles from "./index.module.scss";
// Assets
import menuIcon from "@root/assets/images/menu-icon.svg";

export const Menu = ({ children, isOpen, onOpen, onClose }) => {
	function handleOpenMenu() {
		onOpen();
	}

	function handleCloseMenu() {
		onClose();
	}

	return (
		<div className={styles["menu"]}>
			<button className={styles["menu__menu-button"]} onClick={handleOpenMenu}>
				<img src={menuIcon} alt="menu-icon" width={30} height={30} />
			</button>
			<MenuContent onClose={handleCloseMenu} isOpen={isOpen}>
				{children}
			</MenuContent>
		</div>
	);
};
