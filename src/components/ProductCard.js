import React from "react";
import styles from "./styles/ProductCard.module.scss";

const ProductCard = ({ product }) => {
  const { imageUrl, name, brand, category, price, rating } = product;
  return (
    <div data-testid="card" className={styles.card}>
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <p className={styles.category}>Category: {category}</p>
      <p className={styles.brand}>Brand: {brand}</p>
      <p className={styles.price}>Price: ${price.toFixed(2)}</p>
      <p className={styles.rating}>Rating: {rating} ⭐</p>
    </div>
  );
};

export default ProductCard;
