import React from "react";
import styles from "./styles/Shimmer.module.scss";

const Shimmer = () => {
  const shimmerItems = Array.from({ length: 50 }, (_, index) => index);
  return (
    <div className={styles.shimmer}>
      {shimmerItems.map((item) => (
        <div className={styles.card} key={item}>
          <div className={styles.image}></div>
          <div className={styles.info}>
            <p className={styles.text}></p>
            <p className={`${styles.text} ${styles.short}`}></p>
            <p className={`${styles.text} ${styles.short}`}></p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
