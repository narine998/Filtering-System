import React from "react";
import styles from "../styles/SortOptions.module.scss";
import { SORT_OPTIONS_NAMES, SORT_OPTIONS_VALUES } from "../../utils/constants";

const SortOptions = ({ sortby, onChange }) => {
  return (
    <div className={styles.sort}>
      <label htmlFor="sort">Sort by:</label>
      <select
        id="sort"
        value={sortby}
        onChange={(e) => {
          onChange("sortby", e.target.value);
        }}
      >
        {SORT_OPTIONS_VALUES.map((item, i) => (
          <option key={item} value={item}>
            {SORT_OPTIONS_NAMES[i]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortOptions;
