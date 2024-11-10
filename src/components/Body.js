import React, { useEffect, useRef } from "react";
import ProductContainer from "./ProductContainer";
import Shimmer from "./Shimmer";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsPerScroll,
  selectProductsSlice,
} from "../features/productSlice";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import ErrorComponent from "./ErrorComponent";
import FilterSidebar from "./FilterSidebar";
import { selectMenu } from "../features/appSlice";
import { useFilters } from "../hooks/useFilters";
import { applyFilters, selectFilters } from "../features/filterSlice";
import { PRODUCT_LIMIT } from "../utils/constants";
import { selectSearchText } from "../features/searchSlice";

const Body = () => {
  const { loading, page, error, hasMore, products } =
    useSelector(selectProductsSlice);
  const searchText = useSelector(selectSearchText);

  const { hasFilters, filters } = useSelector(selectFilters);
  const isMenuOpen = useSelector(selectMenu);
  const sidebarRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const savedFilters = JSON.parse(localStorage.getItem("filters"));
    if (savedFilters) {
      dispatch(applyFilters(savedFilters));
    }
  }, []);

  useEffect(() => {
    if (
      !hasFilters &&
      (page === 1 || (products.length < page * PRODUCT_LIMIT && hasMore))
    ) {
      dispatch(fetchProductsPerScroll({ page }));
    }
  }, [page, hasMore, hasFilters]);

  useFilters(filters, searchText, products);
  useInfiniteScroll(loading, page, hasFilters, hasMore);

  return (
    <>
      {isMenuOpen && <FilterSidebar ref={sidebarRef} />}
      {loading && <Shimmer />}
      {error && <ErrorComponent />}
      {!loading && !error && <ProductContainer />};
    </>
  );
};

export default Body;
