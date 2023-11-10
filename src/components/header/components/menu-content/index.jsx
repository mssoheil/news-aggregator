import React from "react";
// Styles
import styles from "./index.module.scss";
// Assets
import closeIcon from "../../../../assets/images/close-icon.svg";

export const MenuContent = (props) => {
	return (
		<div
			className={`${styles["menu-content"]} ${
				props.isOpened ? styles["menu-content__opened"] : ""
			}`}
		>
			<div className={styles["menu-content__content-wrapper"]}>
				<img
					alt="close"
					src={closeIcon}
					onClick={props.onClose}
					className={styles["content-wrapper__close-button"]}
					width={32}
					height={32}
				/>

				<h3 className={styles["content-wrapper__heading"]}>Categories</h3>
			</div>
		</div>
	);
};
