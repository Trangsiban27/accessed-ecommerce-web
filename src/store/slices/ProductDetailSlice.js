import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import constant_product_detail from "../../constants/constant_product_detail.json";
import ProductServices from "../../services/producServices";

const productDetailAdapter = createEntityAdapter();

export const getProductDetail = createAsyncThunk(
  "productDetail/getProductDetail",
  () => {
    return constant_product_detail;
  }
);

export const getProductSuggestions = createAsyncThunk(
  "productDetail/getProductSuggestions",
  async () => {
    const response = await ProductServices.getProductSuggestions();
    return response;
  }
);

export const productDetailSlice = createSlice({
  name: "productDetail",
  initialState: productDetailAdapter.getInitialState({
    data: null,
    error: null,
    message: null,
    loading: false,
    productSuggestions: null,
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
    builder.addCase(getProductSuggestions.fulfilled, (state, action) => {
      state.loading = false;
      state.productSuggestions = action.payload;
    });
  },
});

export const selecteProductDetail = ({ productDetail }) => productDetail?.data;
export const selecteProductSuggestions = (state) =>
  state.productDetail?.productSuggestions;

export const { setSelectedPrimaryVariant, setImagesVariant } =
  productDetailSlice.actions;

export default productDetailSlice.reducer;
