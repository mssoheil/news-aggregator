import React, { useEffect, useState } from "react";
// Components
import { Input } from "../../../input/index.jsx";
// Styles
import styles from "./index.module.scss";
// Constants
import { categories } from "../../../../constants/categories.ts";
// Assets
import gearIcon from "../../../../assets/images/gear-icon.svg";

export const PreferenceContent = () => {
	const [selectedCategory, setSelectedCategory] = useState("");
	const [source, setSource] = useState("");
	const [author, setAuthor] = useState("");

	useEffect(() => {
		const preferredCategory = localStorage.getItem("preferredCategory");
		const preferredSource = localStorage.getItem("preferredSource");
		const preferredAuthor = localStorage.getItem("preferredAuthor");

		if (preferredCategory) {
			setSelectedCategory(preferredCategory);
		}

		if (preferredSource) {
			setSource(preferredSource);
		}

		if (preferredAuthor) {
			setAuthor(preferredAuthor);
		}
	}, []);

	function handleCategorySelect(key) {
		const currentPreferredCategory = localStorage.getItem("preferredCategory");
		if (currentPreferredCategory === key) {
			localStorage.removeItem("preferredCategory");
			setSelectedCategory("");
		} else {
			setSelectedCategory(key);
			localStorage.setItem("preferredCategory", key);
		}
	}

	function handleSourceChange(event) {
		const { value } = event.target;

		setSource(value);
		localStorage.setItem("preferredSource", value);
	}

	function handleAuthorChange(event) {
		const { value } = event.target;

		setAuthor(value);
		localStorage.setItem("preferredAuthor", value);
	}

	function handleRefresh() {
		window.location.reload();
	}

	return (
		<div className={styles["preference-content"]}>
			<h2 className={styles["preference-content__title"]}>
				<img src={gearIcon} alt="gear" width={30} height={30} />
				Preference
			</h2>
			<h3 className={styles["preference-content__heading"]}>Category</h3>

			<div className={styles["preference-content__categories"]}>
				{categories.map(({ key, label }) => (
					<h4
						className={`${styles["preference-content__item"]} ${
							key === selectedCategory
								? styles["preference-content__item--active"]
								: ""
						}`}
						key={key}
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
			<button
				className={styles["preference-content__button"]}
				onClick={handleRefresh}
			>
				Get Articles
			</button>
		</div>
	);
};
