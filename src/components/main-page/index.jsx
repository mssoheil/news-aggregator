import React, { createContext, useState } from "react";
// Components
import { Header } from "../header";
import { Articles } from "./components/articles";
import { Pagination } from "./components/pagination";
// Hooks
import { useFeed } from "./index.hook";
// Assets
import spinnerIcon from "../../assets/images/tail-spin.svg";
// Styles
import styles from "./index.module.scss";

export const Store = createContext();

export const MainPage = () => {
	const {
		articles,
		hasError,
		loading,
		hasNextPage,
		hasPreviousPage,
		keyword,
		handleSubmit,
		handleKeywordChange,
		goNextPage,
		goPreviousPage,
		onCategorySelect,
		category,
	} = useFeed();

	const [isFilterVisible, setIsFilterVisible] = useState(false);
	const [isCategoryMenuOpened, setIsCategoryMenuOpened] = useState(false);
	const [isPreferenceMenuOpened, setIsPreferenceMenuOpened] = useState(false);

	function handleRefreshPage() {
		window.location.reload(false);
	}

	return (
		<Store.Provider
			value={{
				articles,
				hasError,
				loading,
				hasNextPage,
				hasPreviousPage,
				keyword,
				handleSubmit,
				handleKeywordChange,
				goNextPage,
				goPreviousPage,
				onCategorySelect,
				isFilterVisible,
				setIsFilterVisible,
				isCategoryMenuOpened,
				setIsCategoryMenuOpened,
				category,
				isPreferenceMenuOpened,
				setIsPreferenceMenuOpened,
			}}
		>
			<div
				className={`${styles["main-page"]} ${
					isPreferenceMenuOpened ? styles["main-page--none-interactive"] : ""
				}`}
			>
				<Header />

				{loading ? (
					<img
						alt="spinner"
						src={spinnerIcon}
						className={styles["main-page__spinner"]}
					/>
				) : hasError ? (
					<h3 className={styles["main-page__error"]}>
						Something happened, <span onClick={handleRefreshPage}>Refresh</span>
					</h3>
				) : (
					<Articles />
				)}
				<Pagination />
			</div>
		</Store.Provider>
	);
};
