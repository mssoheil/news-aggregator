import React, { useContext, useMemo, useState } from "react";
import cn from "classnames";
// Components
import { SearchIcon } from "@components/icons";
// Styles
import styles from "./index.module.scss";
// Store
import { Store } from "@components/main-page";

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
					className={cn(styles["search__button"], {
						[styles["search__button--active"]]: !buttonIsDisabled,
					})}
					onClick={handleSubmit}
				>
					<SearchIcon color={!buttonIsDisabled ? "#fff" : "#ccc"} />
				</button>
				<input
					value={value}
					onChange={handleChange}
					className={styles["wrapper__input"]}
				/>
			</div>
		</div>
	);
};
