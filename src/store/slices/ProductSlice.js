import { createSlice } from "@reduxjs/toolkit";
import { productModel } from "../../models/productModel";

export const productSlice = createSlice({
  name: "product",
  initialState: productModel,
  reducers: {
    setProductField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },

    setSpecificationField: (state, action) => {
      const { field, value } = action.payload;
      state.specifications[field] = value;
    },

    addProductImages: (state, action) => {
      const { images } = action.payload;
      state.productImages = [...state.productImages, ...images];
    },

    removeProductImage: (state, action) => {
      const { image } = action.payload;
      state.productImages = state.productImages.filter((img) => img !== image);
    },

    replaceProductImage: (state, action) => {
      const { image } = action.payload;
      state.productImages = state.productImages.map((img) =>
        img === state.primaryImage ? image : img
      );
      state.primaryImage = action.payload;
    },

    resetProductData: () => productModel,
  },
});

export const {
  setProductField,
  setSpecificationField,
  addProductImages,
  removeProductImage,
  replaceProductImage,
  resetProductData,
} = productSlice.actions;

export default productSlice.reducer;
