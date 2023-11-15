import React, { useRef } from "react";
// Styles
import styles from "./index.module.scss";
// Assets
import closeIcon from "../../assets/images/close-icon.svg";
// Hooks
import useOnClickOutside from "./index.hook";

export const Drawer = ({ onClose, isOpen, children }) => {
	const ref = useRef();

	useOnClickOutside(ref, () => onClose());

	return (
		<div
			className={`${styles["drawer"]} ${
				isOpen ? styles["drawer__opened"] : ""
			}`}
			ref={ref}
		>
			<div className={styles["drawer__content-wrapper"]}>
				<img
					alt="close"
					src={closeIcon}
					onClick={onClose}
					className={styles["content-wrapper__close-button"]}
					width={32}
					height={32}
				/>
				{children}
			</div>
		</div>
	);
};
