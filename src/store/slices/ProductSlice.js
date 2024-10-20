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
    // Payload: { field: string, value: any }
    // Ví dụ: dispatch(setProductField({ field: 'name', value: 'New Product Name' }))
    setProductField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },

    // Payload: Không có
    // Ví dụ: dispatch(resetProductData())
    resetProductData: () => initialState,

    // Payload: { name: string, value: string }
    // Ví dụ: dispatch(addSpecification({ name: 'Color', value: 'Red' }))
    addSpecification: (state, action) => {
      state.specifications.push(action.payload);
    },

    // Payload: string (tên của thông số kỹ thuật cần xóa)
    // Ví dụ: dispatch(removeSpecification('Color'))
    removeSpecification: (state, action) => {
      state.specifications = state.specifications.filter(
        (spec) => spec.name !== action.payload
      );
    },

    // Payload: { name: string, value: string }
    // Ví dụ: dispatch(updateSpecification({ name: 'Color', value: 'Blue' }))
    updateSpecification: (state, action) => {
      const { name, value } = action.payload;
      state.specifications[name] = value;
    },

    // Payload: string (URL hoặc đường dẫn của hình ảnh)
    // Ví dụ: dispatch(addProductImages(['https://example.com/image.jpg']))
    addProductImages: (state, action) => {
      state.productImages = [...state.productImages, ...action.payload];
    },

    // Payload: string (URL hoặc đường dẫn của hình ảnh)
    // Ví dụ: dispatch(replaceProductImage(['https://example.com/image.jpg']))
    replaceProductImage: (state, action) => {
      state.productImages = state.productImages.map((img) =>
        img === state.primaryImage ? action.payload : img
      );
      state.primaryImage = action.payload;
    },

    // Payload: string (URL hoặc đường dẫn của hình ảnh)
    // Ví dụ: dispatch(addProductImage('https://example.com/image.jpg'))
    removeProductImage: (state, action) => {
      state.productImages = state.productImages.filter(
        (image) => image !== action.payload
      );
    },

    // Payload: string (URL hoặc đường dẫn của hình ảnh chính)
    // Ví dụ: dispatch(setPrimaryImage('https://example.com/main-image.jpg'))
    setPrimaryImage: (state, action) => {
      state.primaryImage = action.payload;
    },

    // Payload: Array<string> (mảng chứa các ID danh mục)
    // Ví dụ: dispatch(setCategories(['category1', 'category2']))
    setCategories: (state, action) => {
      state.categories = action.payload;
    },

    // Payload: Không có
    // Ví dụ: dispatch(toggleHasVariants())
    toggleHasVariants: (state) => {
      state.hasVariants = !state.hasVariants;
    },
  },
});

export const {
  setProductField,
  resetProductData,
  addSpecification,
  removeSpecification,
  updateSpecification,
  addProductImages,
  removeProductImage,
  replaceProductImage,
  setPrimaryImage,
  setCategories,
  toggleHasVariants,
} = productSlice.actions;

export default productSlice.reducer;
