import React from "react";
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

export const MainPage = () => {
  const {
    articles,
    hasError,
    loading,
    hasNextPage,
    hasPreviousPage,
    goNextPage,
    goPreviousPage,
  } = useFeed();

  function handleRefreshPage() {
    window.location.reload(false);
  }

  return (
    <div className={styles["main-page"]}>
      <Header />

      {loading ? (
        <img
          src={spinnerIcon}
          alt="spinner"
          className={styles["main-page__spinner"]}
        />
      ) : hasError ? (
        <h3 className={styles["main-page__error"]}>
          Something happened, <span onClick={handleRefreshPage}>Refresh</span>
        </h3>
      ) : (
        <Articles data={articles} />
      )}
      <Pagination
        goNext={goNextPage}
        goPrevious={goPreviousPage}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
      />
    </div>
  );
};
