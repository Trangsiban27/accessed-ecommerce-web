import { configureStore } from "@reduxjs/toolkit";
import { ProductSlice } from "./slices/ProductSlice";
import { VariantSlice } from "./slices/VariantSlice";

export const store = configureStore({
  reducer: {
    product: ProductSlice.reducer,
    variants: VariantSlice.reducer,
  },
});

export default store;
