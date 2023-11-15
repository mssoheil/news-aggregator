import { useContext } from "react";
// Components
import { MenuContent } from "../menu-content";
// Styles
import styles from "./index.module.scss";
// Store
import { Store } from "../../../main-page";
// Assets
import menuIcon from "../../../../assets/images/menu-icon.svg";

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
        <img src={menuIcon} alt="menu-icon" width={30} height={30} />
      </button>
      <MenuContent onClose={handleCloseMenu} />
    </div>
  );
};
