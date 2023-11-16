import React from "react";
// Styles
import styles from "./index.module.scss";
// Assets
import spinnerIcon from "../../assets/images/tail-spin.svg";

export const Button = ({ onClick, disabled, loading, children, className }) => {
	return (
		<button
			className={`${styles.button} ${className ?? ""}`}
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
