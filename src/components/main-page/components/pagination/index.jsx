import React from "react";
// Styles
import styles from "./index.module.scss";
// Components
import { ChevronLeft, ChevronRight } from "../../../icons";

export const Pagination = ({
  hasNextPage,
  hasPreviousPage,
  goNext,
  goPrevious,
}) => {
  return (
    <div className={styles.pagination}>
      <button onClick={goPrevious}>
        <ChevronLeft color={hasPreviousPage ? "#000" : "#aaa"} />
      </button>
      <button onClick={goNext}>
        <ChevronRight color={hasNextPage ? "#000" : "#aaa"} />
      </button>
    </div>
  );
};
