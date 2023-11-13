import React, { useState } from "react";
// Components
import { Input } from "../../../input";
// Styles
import styles from "./index.module.scss";
// Assets
import spinnerIcon from "../../../../assets/images/tail-spin.svg";

export const FilterSection = ({ onSubmit, loading }) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [source, setSource] = useState("");

  function handleFromDateChange(event) {
    setFromDate(event.target.value);
  }

  function handleToDateChange(event) {
    setToDate(event.target.value);
  }

  function handleSourceChange(event) {
    setSource(event.target.value);
  }

  function handleSubmit() {
    onSubmit(fromDate, toDate, source);
  }

  return (
    <div className={styles["filter-section"]}>
      <div className={styles["filter-section__inputs-wrapper"]}>
        <Input type="date" onChange={handleFromDateChange} value={fromDate}>
          From:
        </Input>
        <Input type="date" onChange={handleToDateChange} value={toDate}>
          To:
        </Input>
        <Input type="text" onChange={handleSourceChange} value={source}>
          Source:
        </Input>
      </div>
      <div className={styles["filter-section__button-wrapper"]}>
        <button
          className={styles["button-wrapper__button"]}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <img
              alt="spinner"
              src={spinnerIcon}
              className={styles["button__spinner"]}
            />
          ) : (
            "Get Articles"
          )}
        </button>
      </div>
    </div>
  );
};
