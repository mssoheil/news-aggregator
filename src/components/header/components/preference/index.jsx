import React, { useContext } from "react";
// Components
import { Drawer } from "../../../drawer";
import { PreferenceContent } from "../preference-content";
// Assets
import gearIcon from "../../../../assets/images/gear-icon.svg";
// Assets
import { Store } from "../../../main-page";
// Styles
import styles from "./index.module.scss";

export const Preference = () => {
	const {
		isPreferenceMenuOpened,
		setIsPreferenceMenuOpened,
		category: selectedCategory,
	} = useContext(Store);

	function handleOpenMenu() {
		setIsPreferenceMenuOpened(true);
	}

	function handleCloseMenu() {
		setIsPreferenceMenuOpened(false);
	}

	function onCategorySelect() {}

	return (
		<div className={styles["preference-content"]}>
			<button
				className={styles["hamburger-menu__menu-button"]}
				onClick={handleOpenMenu}
			>
				<img
					src={gearIcon}
					alt="gear"
					width={30}
					height={30}
					onClick={handleOpenMenu}
				/>
			</button>

			<Drawer isOpen={isPreferenceMenuOpened} onClose={handleCloseMenu}>
				<PreferenceContent
					onClose={handleCloseMenu}
					selectedCategory={selectedCategory}
					onCategorySelect={onCategorySelect}
				/>
			</Drawer>
		</div>
	);
};
