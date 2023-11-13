import React from "react";
// Components
import { Menu } from "./components/menu";
import { Search } from "./components/search";
import { FilterIcon } from "../icons";
import { FilterSection } from "./components/filter-section";
// Styles
import styles from "./index.module.scss";

export const Header = ({
  isFilterVisible,
  setIsFilterVisible,
  keyword,
  onSubmit,
  loading,
  onKeywordChange,
}) => {
  function handleToggleVisible() {
    setIsFilterVisible((isFilterVisible) => !isFilterVisible);
  }

  return (
    <div className={styles.header}>
      <Menu />
      <div className={styles["header__filter-section"]}>
        <Search value={keyword} onChange={onKeywordChange} />
        <button
          onClick={handleToggleVisible}
          className={`${styles["filter-section__filter-icon"]} ${
            isFilterVisible
              ? styles["filter-section__filter-icon--visible"]
              : ""
          }`}
        >
          <FilterIcon />
        </button>
      </div>
      <div
        className={`${styles["header__filter-content"]} ${
          isFilterVisible ? styles["header__filter-content--visible"] : ""
        }`}
      >
        <FilterSection onSubmit={onSubmit} loading={loading} />
      </div>
    </div>
  );
};
