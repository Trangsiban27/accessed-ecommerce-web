import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./slices/productSlice";
import { variantSlice } from "./slices/VariantSlice";
import ReviewReducer from "./slices/ReviewSlice";
import productDetailReducer from "./slices/productDetailSlice";
import productListReducer from "./slices/ProductListSlice";

export const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    productDetail: productDetailReducer,
    productList: productListReducer,
    variants: variantSlice.reducer,
    review: ReviewReducer,
  },
});

export default store;
