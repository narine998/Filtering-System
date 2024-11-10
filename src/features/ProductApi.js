import { IMAGES_API_URL } from "../utils/constants";
import { sortProducts } from "../utils/helper";

export const fetchImages = async (page, count) => {
  const imageUrl = `${IMAGES_API_URL}${
    process.env.REACT_APP_IMAGE_API_KEY
  }&page=${page || 1}&per_page=${count}`;
  const imgData = await fetch(imageUrl);

  const imgJson = await imgData.json();
  return imgJson.hits;
};

export const fetchProducts = async (page, limit) => {
  let jsonServerUrl = process.env.REACT_APP_JSON_SERVER_URL;
  if (page) {
    jsonServerUrl += `?_page=${page}&_per_page=${limit}`;
  }
  const response = await fetch(jsonServerUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const json = await response.json();
  const data = limit ? json.data : json;
  limit = limit || data.length;
  const images = await fetchImages(page, limit);
  data.forEach((item, i) => {
    item.imageUrl = images[i].largeImageURL;
  });

  return json;
};

export const applyDataFilters = async (filters, searchText) => {
  const { category, rating, brand, minPrice, maxPrice } = filters;

  const json = await fetchProducts();

  const filteredData = json.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesCategory =
      category.length === 0 || category.includes(p.category);
    const matchesBrand = brand.length === 0 || brand.includes(p.brand);
    const matchesPrice = p.price >= minPrice && p.price <= maxPrice;
    const matchesRating = rating === 0 || p.rating >= rating;
    return (
      matchesSearch &&
      matchesCategory &&
      matchesBrand &&
      matchesPrice &&
      matchesRating
    );
  });

  if (filters.sortby) {
    sortProducts(filteredData, filters.sortby);
  }

  return filteredData;
};
