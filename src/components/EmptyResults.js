import React from "react";
import styles from "./styles/EmptyResults.module.scss";

const EmptyResults = () => {
  return (
    <div className={styles.results}>
      <h1>No Products Found</h1>
      <p>We couldn't find any products matching your criteria.</p>
    </div>
  );
};

export default EmptyResults;
