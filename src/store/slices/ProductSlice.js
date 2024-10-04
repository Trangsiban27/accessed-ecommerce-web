import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "Smartphone 7",
  brandName: "Apple",
  description:
    "A state-of-the-art smartphone A state-of-the-art A state-of-the-art smartphone fA state-of-the-art smartphone fA state-of-the-art smartphone fA state-of-the-art smartphone fA state-of-the-art smartphone f fA state-of-the-art smartphone fA state-of-the-art smartphone fA state-of-the-art smartphone fA state-of-the-art smartphone ff",
  sku: "PRODUCT_Z_U",
  originalPrice: 0,
  discountedPrice: 0,
  sellingPrice: 0,
  hasSpecification: false,
  hasCollection: false,
  isFeatured: false,
  sellingType: "ONLINE",
  quantityAvailable: 500,
  primaryImage: "",
  productImages: [],
  collections: [],
  categoryIds: [
    "66ed97714463802942e6cfab",
    "66ed97214463802942e6cfa9",
    "66ee46f0267d0a4e6af0704f",
  ],
  hasVariants: false,
  productVariants: [
    {
      productType: "COLOR",
      valueName: "Yellow",
    },
    {
      productType: "RAM",
      valueName: "16GB",
    },
  ],
  specifications: [
    {
      name: "COLOR",
      value: "Black",
    },
    {
      name: "RAM",
      value: "8GB",
    },
    {
      name: "STORAGE",
      value: "128GB",
    },
  ],
  productDimension: {
    width: 12.1,
    weight: 12.1,
    length: 12.1,
    breadth: 12.1,
    unitWeight: "kg",
    packageUnit: "inch",
  },
};

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateProductField: (state, action) => {
      const { field, value } = action.payload;
      return {
        ...state,
        [field]: value,
      };
    },

    resetAroductData: () => initialState,
  },
});

export const { updateProductField, resetProductData } = ProductSlice.actions;

export default ProductSlice.reducer;
