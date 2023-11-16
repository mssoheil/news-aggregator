import React from "react";
// Styles
import styles from "./index.module.scss";

export const Input = ({ children, value, type, onChange }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles["wrapper__title"]}>{children}</div>
			<input
				type={type}
				value={value}
				onChange={onChange}
				className={styles["wrapper__input"]}
			/>
		</div>
	);
};
