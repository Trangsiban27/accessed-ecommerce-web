import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const reviewAdapter = createEntityAdapter();

export const addReview = createAsyncThunk(
  "review/addReview",
  async (newReview) => {
    const response = await axios.post("api/add-review", newReview);
    return response.data;
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState: reviewAdapter.getInitialState({
    isShowModal: false,
    isShowAddModal: false,
    isLoading: false,
    error: null,
  }),
  reducers: {
    setIsShowModal: (state, action) => {
      state.isShowModal = action.payload;
    },
    setIsShowAddModal: (state, action) => {
      state.isShowAddModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addReview.pending, (state) => {
        state.isLoading = true; // Đặt trạng thái loading khi bắt đầu thêm đánh giá
        state.error = null; // Reset lỗi
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.isLoading = false; // Tắt trạng thái loading khi thêm thành công
        reviewAdapter.addOne(action.payload, state); // Thêm đánh giá mới vào state
      })
      .addCase(addReview.rejected, (state) => {
        state.isLoading = false; // Tắt trạng thái loading khi có lỗi
        state.error = "Failed to add review"; // Thiết lập lỗi
      });
  },
});

export const { setIsShowModal, setIsShowAddModal } = reviewSlice.actions;

export default reviewSlice.reducer;
