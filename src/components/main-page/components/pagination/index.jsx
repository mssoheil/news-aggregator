import React, { useContext } from "react";
// Styles
import styles from "./index.module.scss";
// Components
import { ChevronLeft, ChevronRight } from "../../../icons";
// Store
import { Store } from "../..";

export const Pagination = () => {
	const { hasNextPage, hasPreviousPage, goNextPage, goPreviousPage } =
		useContext(Store);

	return (
		<div className={styles.pagination}>
			<button onClick={goPreviousPage}>
				<ChevronLeft color={hasPreviousPage ? "#000" : "#aaa"} />
			</button>
			<button onClick={goNextPage}>
				<ChevronRight color={hasNextPage ? "#000" : "#aaa"} />
			</button>
		</div>
	);
};
