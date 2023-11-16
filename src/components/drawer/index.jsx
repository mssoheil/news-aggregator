import React, { useRef } from "react";
import cn from "classnames";
// Styles
import styles from "./index.module.scss";
// Assets
import closeIcon from "@root/assets/images/close-icon.svg";
// Hooks
import useOnClickOutside from "./index.hook";

export const Drawer = ({ onClose, isOpen, children }) => {
	const ref = useRef();

	useOnClickOutside(ref, () => onClose());

	return (
		<div
			className={cn(styles.drawer, {
				[styles["drawer__opened"]]: isOpen,
			})}
			ref={ref}
		>
			<div className={styles["drawer__content-wrapper"]}>
				<img
					width={32}
					height={32}
					alt="close"
					src={closeIcon}
					onClick={onClose}
					className={styles["content-wrapper__close-button"]}
				/>
				{children}
			</div>
		</div>
	);
};
