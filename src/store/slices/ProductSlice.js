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
  categoryIds: [],
  specifications: [],
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
      const { key, value } = action.payload;
      state.specifications.find(item => item.key === key).value = value;
    },

    addProductImages: (state, action) => {
      const { images } = action.payload;
      state.productImages = [...state.productImages, ...images];
      if (state.primaryImage === "") state.primaryImage = state.productImages[0];
    },

    removeProductImage: (state, action) => {
      const { image } = action.payload;
      state.productImages = state.productImages.filter((img) => img !== image);
    },

    setPrimaryImage: (state, action) => {
      state.primaryImage = action.payload;
    },

    removePrimaryImage: (state) => {
      state.productImages = state.productImages.filter((img) => img !== state.primaryImage);
      if(state.productImages.length) state.primaryImage = state.productImages[0]
    },

    replacePrimaryImage: (state, action) => {
      const { new_image } = action.payload;
      state.productImages = state.productImages.map((img) =>
        img === state.primaryImage ? new_image : img
      );
      state.primaryImage = new_image;
    },

    resetProductData: () => initialState,
  },
});

export const {
  setProductField,
  setSpecificationField,
  addProductImages,
  removeProductImage,
  removePrimaryImage,
  replacePrimaryImage,
  resetProductData,
  setPrimaryImage,
} = productSlice.actions;

export default productSlice.reducer;
