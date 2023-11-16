import React from "react";
import cn from "classnames";
// Styles
import styles from "./index.module.scss";
// Assets
import spinnerIcon from "@root/assets/images/tail-spin.svg";

export const Button = ({ onClick, disabled, loading, children, className }) => {
	return (
		<button
			className={cn(styles.button, className)}
			disabled={disabled || loading}
			onClick={onClick}
		>
			{loading ? (
				<img
					alt="spinner"
					src={spinnerIcon}
					className={styles["button__spinner"]}
				/>
			) : (
				children
			)}
		</button>
	);
};
