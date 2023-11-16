import React, { useContext, useEffect, useState } from "react";
// Components
import { Input } from "../../../input/index.jsx";
import { Button } from "../../../button/index.jsx";
import { GearIcon } from "../../../icons/index.js";
// Styles
import styles from "./index.module.scss";
// Constants
import { categories } from "../../../../constants/categories.ts";
// Store
import { Store } from "../../../main-page/index.jsx";

export const PreferenceContent = ({ onClose }) => {
	const {
		onCategorySelect: setSelectedCategory,
		setSource: setSelectedSource,
		setAuthor: setSelectedAuthor,
	} = useContext(Store);

	const [category, setCategory] = useState("");
	const [source, setSource] = useState("");
	const [author, setAuthor] = useState("");

	useEffect(() => {
		const preferredCategory = localStorage.getItem("preferredCategory");
		const preferredSource = localStorage.getItem("preferredSource");
		const preferredAuthor = localStorage.getItem("preferredAuthor");

		if (preferredCategory) {
			setCategory(preferredCategory);
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
			setCategory("");
		} else {
			setCategory(key);
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
		setSelectedCategory(category);
		setSelectedSource(source);
		setSelectedAuthor(author);
		onClose();
	}

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
						className={`${styles["preference-content__item"]} ${
							key === category ? styles["preference-content__item--active"] : ""
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
			<Button
				onClick={handleRefresh}
				className={styles["preference-content__button"]}
			>
				Get Articles
			</Button>
		</div>
	);
};
