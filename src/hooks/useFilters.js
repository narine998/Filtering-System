import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateHasFilters } from "../features/filterSlice";
import {
  changeFilteredData,
  fetchProductsForFilter,
} from "../features/productSlice";

export const useFilters = (filters, searchText, products) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const { category, rating, brand, minPrice, maxPrice, sortby } = filters;
      if (
        searchText ||
        category.length ||
        brand.length ||
        rating ||
        minPrice ||
        maxPrice < 1000 ||
        sortby
      ) {
        dispatch(updateHasFilters(true));
        dispatch(fetchProductsForFilter({ filters, searchText }));
      } else {
        dispatch(updateHasFilters(false));
        dispatch(changeFilteredData());
      }
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [searchText, filters, products]);
};
