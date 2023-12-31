import React from "react";
// Components
import { Input } from "@components/input";
// Styles
import styles from "./index.module.scss";

export const FilterInputs = ({
  toDate,
  source,
  fromDate,
  setToDate,
  setSource,
  setFromDate,
}) => {
  function handleFromDateChange(event) {
    setFromDate(event.target.value);
  }

  function handleToDateChange(event) {
    setToDate(event.target.value);
  }

  function handleSourceChange(event) {
    setSource(event.target.value);
  }

  return (
    <div className={styles["filter-inputs"]}>
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
  );
};
