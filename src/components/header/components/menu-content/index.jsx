import React from "react";
import cn from "classnames";
// Styles
import styles from "./index.module.scss";
// Constants
import { categories } from "@root/constants/categories.js";

export const MenuContent = ({
	onClose,
	onCategorySelect,
	selectedCategory,
}) => {
	function handleCategorySelect(key) {
		onCategorySelect(key);
		onClose();
	}

	return (
		<div className={styles["menu-content"]}>
			<h3 className={styles["menu-content__heading"]}>Categories</h3>

			{categories.map(({ key, label }) => (
				<h4
					className={cn(styles["menu-content__item"], {
						[styles["menu-content__item--active"]]: key === selectedCategory,
					})}
					key={key}
					onClick={() => handleCategorySelect(key)}
				>
					{label}
				</h4>
			))}
		</div>
	);
};
