// categoriesService.js
import { PRODUCT_CATEGORIES } from "../constants/constant_category";

let server_response = PRODUCT_CATEGORIES;

export const getCagegories = () => {
  return server_response;
};

export const getSubCategoriesById = (id) => {
  const categoryIndex = server_response.findIndex((item) => item.id === id);
  return server_response[categoryIndex]?.subCategories || [];
};
