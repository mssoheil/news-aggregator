import React from "react";
// Styles
import styles from "./index.module.scss";
// Assets
import closeIcon from "../../../../assets/images/close-icon.svg";

const categories = [
	{
		label: "Business",
		key: "business",
	},
	{
		label: "Health",
		key: "health",
	},
	{
		label: "Science",
		key: "science",
	},
	{
		label: "Sports",
		key: "sports",
	},
	{
		label: "Technology",
		key: "technology",
	},
];
export const MenuContent = ({ isOpened, onClose, onCategorySelect }) => {
	return (
		<div
			className={`${styles["menu-content"]} ${
				isOpened ? styles["menu-content__opened"] : ""
			}`}
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
						className={styles["content-wrapper__item"]}
						key={category.key}
						onClick={() => onCategorySelect(category.key)}
					>
						{category.label}
					</h4>
				))}
			</div>
		</div>
	);
};
