import { RATING_LABELS } from "./constants";

export const getLabelText = (value) => {
  return `${value} Star${value !== 1 ? "s" : ""}, ${RATING_LABELS[value]}`;
};

export const sortProducts = (data, sortby) => {
  if (sortby === "price-asc") {
    data.sort((a, b) => a.price - b.price);
  } else if (sortby === "price-desc") {
    data.sort((a, b) => b.price - a.price);
  } else if (sortby === "rating-asc") {
    data.sort((a, b) => a.rating - b.rating);
  } else if (sortby === "rating-desc") {
    data.sort((a, b) => b.rating - a.rating);
  }
};
