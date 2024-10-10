import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./slices/productSlice";
import { variantSlice } from "./slices/VariantSlice";
import ReviewReducer from "./slices/ReviewSlice";

export const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    variants: variantSlice.reducer,
    review: ReviewReducer,
  },
});

export default store;
