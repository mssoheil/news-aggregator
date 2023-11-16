import React, { createContext, useState } from "react";
import cn from "classnames";
// Components
import { Header } from "../header";
import { Articles } from "./components/articles";
import { Pagination } from "./components/pagination";
// Hooks
import { useFeed } from "./index.hook";
// Assets
import spinnerIcon from "@root/assets/images/tail-spin.svg";
// Styles
import styles from "./index.module.scss";

export const Store = createContext();

export const MainPage = () => {
	const feed = useFeed();

	const [isFilterVisible, setIsFilterVisible] = useState(false);
	const [isCategoryMenuOpened, setIsCategoryMenuOpened] = useState(false);
	const [isPreferenceMenuOpened, setIsPreferenceMenuOpened] = useState(false);

	function handleRefreshPage() {
		window.location.reload(false);
	}
	console.log("Debug ~ MainPage ~ isFilterVisible:", isFilterVisible);
	console.log(
		"Debug ~ MainPage ~ isPreferenceMenuOpened:",
		isPreferenceMenuOpened
	);

	return (
		<Store.Provider
			value={{
				...feed,
				isFilterVisible,
				setIsFilterVisible,
				isCategoryMenuOpened,
				isPreferenceMenuOpened,
				setIsCategoryMenuOpened,
				setIsPreferenceMenuOpened,
			}}
		>
			<div
				className={cn(styles["main-page"], {
					[styles["main-page--none-interactive"]]:
						isPreferenceMenuOpened || isCategoryMenuOpened,
				})}
			>
				<Header />

				{feed.loading ? (
					<img
						alt="spinner"
						src={spinnerIcon}
						className={styles["main-page__spinner"]}
					/>
				) : feed.hasError ? (
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
