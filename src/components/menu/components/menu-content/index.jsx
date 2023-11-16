import React, { useContext } from "react";
import cn from "classnames";
// Styles
import styles from "./index.module.scss";
// Assets
import closeIcon from "@root/assets/images/close-icon.svg";
// Constants
import { categories } from "@root/constants/categories.js";
// Store
import { Store } from "@components/main-page";

export const MenuContent = ({ onClose, isOpen }) => {
	const {
		onCategorySelect,
		setIsCategoryMenuOpened,
		category: selectedCategory,
	} = useContext(Store);

	function handleCategorySelect(key) {
		onCategorySelect(key);
		setIsCategoryMenuOpened(false);
	}

	return (
		<div
			className={cn(styles["menu-content"], {
				[styles["menu-content__opened"]]: isOpen,
			})}
		>
			<div className={styles["menu-content__content-wrapper"]}>
				<img
					alt="close"
					src={closeIcon}
					onClick={onClose}
					className={styles["content-wrapper__close-button"]}
					width={32}
					height={32}
				/>

				<h3 className={styles["content-wrapper__heading"]}>Categories</h3>

				{categories.map((category) => (
					<h4
						className={cn(styles["content-wrapper__item"], {
							[styles["content-wrapper__item--active"]]:
								category.key === selectedCategory,
						})}
						key={category.key}
						onClick={() => handleCategorySelect(category.key)}
					>
						{category.label}
					</h4>
				))}
			</div>
		</div>
	);
};
