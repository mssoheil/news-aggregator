import React, { useContext, useMemo, useState } from "react";
// Components
import { FilterInputs } from "../filter-inputs";
// Styles
import styles from "./index.module.scss";
// Assets
import spinnerIcon from "../../../../assets/images/tail-spin.svg";
// Store
import { Store } from "../../../main-page";
import { Button } from "../../../button";

export const FilterSection = () => {
	const { loading, handleSubmit: onSubmit } = useContext(Store);

	const [fromDate, setFromDate] = useState("");
	const [toDate, setToDate] = useState("");
	const [source, setSource] = useState("");

	const formIsEmpty = useMemo(
		() => !source && !fromDate && !toDate,
		[fromDate, toDate, source]
	);

	function handleSubmit() {
		onSubmit(fromDate, toDate, source);
	}

	return (
		<div className={styles["filter-section"]}>
			<FilterInputs
				toDate={toDate}
				source={source}
				fromDate={fromDate}
				setToDate={setToDate}
				setSource={setSource}
				setFromDate={setFromDate}
			/>
			<div className={styles["filter-section__button-wrapper"]}>
				<Button onClick={handleSubmit} disabled={formIsEmpty} loading={loading}>
					Get Articles
				</Button>
			</div>
		</div>
	);
};
