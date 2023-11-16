import React from "react";
import cn from "classnames";
// Components
import { Input } from "@components/input";
import { Button } from "@components/button";
import { GearIcon } from "@components/icons";
// Hooks
import { usePreference } from "./index.hook";
// Styles
import styles from "./index.module.scss";
// Constants
import { categories } from "@root/constants/categories.js";

export const PreferenceContent = ({ onClose }) => {
	const {
		author,
		source,
		category,
		handleRefresh,
		handleAuthorChange,
		handleSourceChange,
		handleCategorySelect,
	} = usePreference(onClose);

	return (
		<div className={styles["preference-content"]}>
			<h2 className={styles["preference-content__title"]}>
				<GearIcon color="#aaa" />
				Preference
			</h2>
			<h3 className={styles["preference-content__heading"]}>Category</h3>

			<div className={styles["preference-content__categories"]}>
				{categories.map(({ key, label }) => (
					<h4
						key={key}
						className={cn(styles["preference-content__item"], {
							[styles["preference-content__item--active"]]: key === category,
						})}
						onClick={() => handleCategorySelect(key)}
					>
						{label}
					</h4>
				))}
			</div>
			<div className={styles["preference-content__input-section"]}>
				<div>
					<h3 className={styles["preference-content__heading"]}>Source</h3>

					<Input type="text" onChange={handleSourceChange} value={source}>
						Source:
					</Input>
				</div>

				<div>
					<h3 className={styles["preference-content__heading"]}>Author</h3>

					<Input type="text" onChange={handleAuthorChange} value={author}>
						Author:
					</Input>
				</div>
			</div>
			<Button
				onClick={handleRefresh}
				className={styles["preference-content__button"]}
			>
				Get Articles
			</Button>
		</div>
	);
};
