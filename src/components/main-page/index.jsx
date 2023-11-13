import React, { useState } from "react";
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
    keyword,
    handleSubmit,
    handleKeywordChange,
    goNextPage,
    goPreviousPage,
  } = useFeed();

  const [isFilterVisible, setIsFilterVisible] = useState(false);

  function handleRefreshPage() {
    window.location.reload(false);
  }

  return (
    <div className={styles["main-page"]}>
      <Header
        isFilterVisible={isFilterVisible}
        onKeywordChange={handleKeywordChange}
        setIsFilterVisible={setIsFilterVisible}
        keyword={keyword}
        onSubmit={handleSubmit}
        loading={loading}
      />

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
        <Articles data={articles} filterIsOpened={isFilterVisible} />
      )}
      <Pagination
        goNext={goNextPage}
        hasNextPage={hasNextPage}
        goPrevious={goPreviousPage}
        hasPreviousPage={hasPreviousPage}
      />
    </div>
  );
};
