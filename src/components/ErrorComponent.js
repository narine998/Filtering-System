import React from "react";
import styles from "./styles/Error.module.scss";

const ErrorComponent = () => {
  return (
    <div className={styles.container}>
      <h1>Sorry, we couldn't find any products!</h1>
      <p>Please try again later or check your filters.</p>
    </div>
  );
};

export default ErrorComponent;
