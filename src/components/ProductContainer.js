import React, { useEffect } from "react";
import styles from "./styles/ProductContainer.module.scss";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import { selectProductsSlice } from "../features/productSlice";
import EmptyResults from "./EmptyResults";

const ProductContainer = () => {
  const { filteredProducts, productsFound, page } =
    useSelector(selectProductsSlice);

  useEffect(() => {
    if (page === 1) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  return (
    <div data-testid="cardList" className={styles.container}>
      {filteredProducts.length
        ? filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        : !productsFound && <EmptyResults />}
    </div>
  );
};

export default ProductContainer;
