import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  brandName: "",
  description: "",
  sellingType: "ONLINE",
  sku: "",
  quantityAvailable: null,
  originalPrice: null,
  discountedPrice: null,
  sellingPrice: null,
  hasSpecification: false,
  hasCollection: false,
  hasVariants: false,
  isFeatured: false,
  width: null,
  weight: null,
  length: null,
  breadth: null,
  unitWeight: "",
  packageUnit: "",
  primaryImage: "",
  productImages: [],
  collections: [],
  categories: [],
  specifications: {},
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },

    setSpecificationField: (state, action) => {
      const { field, value } = action.payload;
      state.specifications[field] = value;
    },

    setPrimaryImage: (state, action) => {
      state.primaryImage = action.payload;
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
    },

    resetProductData: () => initialState,
  },
});

export const {
  setProductField,
  setSpecificationField,
  addProductImages,
  removeProductImage,
  replaceProductImage,
  resetProductData,
  setPrimaryImage,
} = productSlice.actions;

export default productSlice.reducer;
