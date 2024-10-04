import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { productSlice } from "./slices/ProductSlice";
import { variantSlice } from "./slices/VariantSlice";

export const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    variants: variantSlice.reducer,
  },
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = () => useSelector();

export default store;
