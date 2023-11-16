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
				<ChevronLeft color={hasPreviousPage ? "#9b92e9" : "#eee"} />
			</button>
			<button onClick={goNextPage}>
				<ChevronRight color={hasNextPage ? "#9b92e9" : "#eee"} />
			</button>
		</div>
	);
};
