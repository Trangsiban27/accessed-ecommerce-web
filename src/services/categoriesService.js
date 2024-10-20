// categoriesService.js
import categories from "../pages/(seller)/add-product/dummy_data/constant_categories_lv1.json";
import sub_categories from "../pages/(seller)/add-product/dummy_data/constant_categories_lv2.json";

export const getCagegories = () => {
  return categories;
};

export const getSubCategoriesById = (id) => {
  if (categories.data.find(item => item.id === id)?.children?.length) {
    console.log("get categories by id", id);
    return sub_categories;
  }
  return {data: []}
};
