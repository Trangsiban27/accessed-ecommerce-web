import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import constant_product_detail from "../../constants/constant_product_detail.json";

const productDetailAdapter = createEntityAdapter();

export const getProductDetail = createAsyncThunk(
  "productDetail/getProductDetail",
  () => {
    return constant_product_detail;
  }
);

export const productDetailSlice = createSlice({
  name: "productDetail",
  initialState: productDetailAdapter.getInitialState({
    data: null,
    error: null,
    message: null,
    loading: false,
    selectedPrimaryVariant: null,
    imagesVariant: null,
  }),
  reducers: {
    setSelectedPrimaryVariant: (state, action) => {
      state.selectedPrimaryVariant = action.payload;
    },

    setImagesVariant: (state, action) => {
      state.imagesVariant = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductDetail.fulfilled, (state, action) => {
      state.data = action?.payload;
      state.error = null;
      state.message = "get product detail successfully";
    });
  },
});

export const selecteProductDetail = ({ productDetail }) => productDetail?.data;

export const { setSelectedPrimaryVariant, setImagesVariant } =
  productDetailSlice.actions;

export default productDetailSlice.reducer;
