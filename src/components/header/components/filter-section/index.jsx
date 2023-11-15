import React, { useContext, useState } from "react";
// Components
import { FilterInputs } from "../filter-inputs";
// Styles
import styles from "./index.module.scss";
// Assets
import spinnerIcon from "../../../../assets/images/tail-spin.svg";
// Store
import { Store } from "../../../main-page";

export const FilterSection = () => {
  const { loading, handleSubmit: onSubmit } = useContext(Store);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [source, setSource] = useState("");

  function handleSubmit() {
    onSubmit(fromDate, toDate, source);
  }

  return (
    <div className={styles["filter-section"]}>
      <FilterInputs
        toDate={toDate}
        source={source}
        fromDate={fromDate}
        setToDate={setToDate}
        setSource={setSource}
        setFromDate={setFromDate}
      />
      <div className={styles["filter-section__button-wrapper"]}>
        <button
          className={styles["button-wrapper__button"]}
          onClick={handleSubmit}
          disabled={loading || (!source && !fromDate && !toDate)}
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
