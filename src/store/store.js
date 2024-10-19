import { configureStore } from "@reduxjs/toolkit";
import ReviewReducer from "./slices/ReviewSlice";
import productDetailReducer from "./slices/productDetailSlice";
import { productSlice } from "./slices/productSlice";
import { variantSlice } from "./slices/variantsSlice";

export const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    productDetail: productDetailReducer,
    variants: variantSlice.reducer,
    review: ReviewReducer,
  },
});

export default store;
