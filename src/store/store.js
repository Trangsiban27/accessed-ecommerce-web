import { configureStore } from "@reduxjs/toolkit";
import ReviewReducer from "./slices/ReviewSlice";
import productDetailReducer from "./slices/productDetailSlice";

export const store = configureStore({
  reducer: {
    productDetail: productDetailReducer,
    review: ReviewReducer,
  },
});

export default store;
