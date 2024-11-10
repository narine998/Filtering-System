import React, { forwardRef, useEffect } from "react";
import styles from "./styles/FilterSidebar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  applyFilters,
  initialFilters,
  selectFilters,
} from "../features/filterSlice";
import { BRANDS, CATEGORIES } from "../utils/constants";
import CloseIcon from "@mui/icons-material/Close";
import { closeMenu } from "../features/appSlice";
import Rating from "./FilterOptions/Rating";
import { useSideBarRef } from "../hooks/useSideBarRef";
import PriceRange from "./FilterOptions/PriceRange";
import Category from "./FilterOptions/Category";
import SortOptions from "./FilterOptions/SortOptions";

const FilterSidebar = forwardRef((props, ref) => {
  const { filters } = useSelector(selectFilters);
  const dispatch = useDispatch();

  useSideBarRef(ref);

  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]);

  const handleFilterChange = (target, value) => {
    dispatch(
      applyFilters({
        ...filters,
        [target]: value,
      })
    );
  };
  const handleClearFilters = () => {
    dispatch(applyFilters(initialFilters));
    localStorage.removeItem("filters");
  };

  return (
    <div className={styles.sidebar} ref={ref}>
      <div className={styles.flex}>
        <h2>Filters</h2>
        <button data-testid="close" onClick={() => dispatch(closeMenu())}>
          <CloseIcon />
        </button>
      </div>
      <SortOptions sortby={filters.sortby} onChange={handleFilterChange} />

      <div className={styles.group}>
        <Category
          list={CATEGORIES}
          name="category"
          filterArr={filters.category}
          onChange={handleFilterChange}
        />
      </div>

      <div className={styles.group}>
        <Category
          list={BRANDS}
          name="brand"
          filterArr={filters.brand}
          onChange={handleFilterChange}
        />
      </div>

      <div className={styles.group}>
        <h3>Price Range</h3>
        <PriceRange
          price={filters.minPrice}
          onChange={handleFilterChange}
          type="minPrice"
        />
        <PriceRange
          price={filters.maxPrice}
          onChange={handleFilterChange}
          type="maxPrice"
        />
        <p>
          ${filters.minPrice} - ${filters.maxPrice}
        </p>
      </div>

      <div className={styles.group}>
        <h3>Rating</h3>
        <Rating
          handleFilterChange={handleFilterChange}
          value={filters.rating}
        />
        <p>Selected rating: {filters.rating}</p>
      </div>
      <div className={styles.clearBtn}>
        <button onClick={handleClearFilters}>Clear Filters</button>
      </div>
    </div>
  );
});

export default FilterSidebar;
