import React, { useContext } from "react";
import cn from "classnames";
// Components
import { Drawer } from "@components/drawer";
import { GearIcon } from "@components/icons";
import { PreferenceContent } from "../preference-content";
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
				className={cn(styles["preference-content__menu-button"], {
					[styles["preference-content__menu-button--disabled"]]:
						isPreferenceMenuOpened,
				})}
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
