import React, { useContext, useMemo, useState } from "react";
// Components
import { SearchIcon } from "../../../icons";
// Styles
import styles from "./index.module.scss";
import { Store } from "../../../main-page";

export const Search = () => {
	const { handleKeywordChange, keyword, loading } = useContext(Store);

	const [value, setValue] = useState("");

	function handleChange(event) {
		setValue(event.target.value);
	}

	const buttonIsDisabled = useMemo(
		() => (!value && !keyword) || loading,
		[value, keyword, loading]
	);

	function handleSubmit() {
		if (!buttonIsDisabled) {
			handleKeywordChange(value);
		}
	}

	return (
		<div className={styles.search}>
			<div className={styles["search__wrapper"]}>
				<button
					className={`${styles["search__button"]} ${
						!buttonIsDisabled ? styles["search__button--active"] : ""
					}`}
					onClick={handleSubmit}
				>
					<SearchIcon color={!buttonIsDisabled ? "#fff" : "#ccc"} />
				</button>
				<input
					className={styles["wrapper__input"]}
					value={value}
					onChange={handleChange}
				/>
			</div>
		</div>
	);
};
