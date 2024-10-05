import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./slices/productSlice";
import { variantSlice } from "./slices/VariantSlice";

export const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    variants: variantSlice.reducer,
  },
});

export default store;
