import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./slices/productSlice";
import { variantSlice } from "./slices/VariantSlice";
import ReviewReducer from "./slices/ReviewSlice";
import productDetailReducer from "./slices/productDetailSlice";

export const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    productDetail: productDetailReducer,
    variants: variantSlice.reducer,
    review: ReviewReducer,
  },
});

export default store;
