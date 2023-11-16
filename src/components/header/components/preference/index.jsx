import React, { useContext } from "react";
// Components
import { Drawer } from "@components/drawer";
import { PreferenceContent } from "../preference-content";
import { GearIcon } from "@components/icons";
// Assets
import { Store } from "@components/main-page";
// Styles
import styles from "./index.module.scss";

export const Preference = () => {
	const { isPreferenceMenuOpened, setIsPreferenceMenuOpened } =
		useContext(Store);

	function handleOpenMenu() {
		setIsPreferenceMenuOpened(true);
	}

	function handleCloseMenu() {
		setIsPreferenceMenuOpened(false);
	}

	return (
		<div className={styles["preference-content"]}>
			<button
				className={`${styles["preference-content__menu-button"]} ${
					isPreferenceMenuOpened
						? styles["preference-content__menu-button--disabled"]
						: ""
				}`}
				onClick={handleOpenMenu}
			>
				<GearIcon />
			</button>

			<Drawer isOpen={isPreferenceMenuOpened} onClose={handleCloseMenu}>
				<PreferenceContent onClose={handleCloseMenu} />
			</Drawer>
		</div>
	);
};
