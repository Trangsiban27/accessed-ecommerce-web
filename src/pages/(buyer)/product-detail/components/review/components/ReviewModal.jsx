import { Button, Typography } from "@mui/material";
import Overlay from "../../../../../../components/Overlay";
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";
import SortRating from "../../../../../../components/SortRating";
import SortDate from "../../../../../../components/SortDate";
import ReviewItem from "./ReviewItem";
import { useDispatch } from "react-redux";
import {
  setIsShowAddModal,
  setIsShowModal,
} from "../../../../../../store/slices/ReviewSlice";

const ReviewModal = () => {
  const dispatch = useDispatch();
  // const { isShowModal } = useSelector((state) => state.review);

  const handleClose = () => {
    dispatch(setIsShowModal(false));
  };

  const handleOpenAddModal = () => {
    dispatch(setIsShowAddModal(true));
    dispatch(setIsShowModal(false));
  };

  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  return (
    <Overlay onClick={handleClose}>
      <div
        className="absolute top-[40px] h-[90vh] right-5 w-[35%] bg-white p-5 rounded-md text-start overflow-hidden scroll-smooth overflow-y-scroll animate-slideInRight"
        onClick={handleModalClick}
      >
        <div className="flex items-center justify-between">
          <Typography
            variant="subtitle1"
            gutterBottom
            className=" text-start"
            sx={{ fontWeight: "600" }}
          >
            Reviews (10)
          </Typography>
          <div onClick={handleClose}>
            <CloseIcon className="cursor-pointer hover:opacity-70"></CloseIcon>
          </div>
        </div>
        <div className="flex items-center justify-between px-6 py-3 mt-5 mb-4 font-bold bg-gray-100 rounded-md">
          <span>Overall rating</span>
          <span className="flex items-center text-lg gap-x-1">
            4.8 <StarIcon className="text-[#f9669a]"></StarIcon>
          </span>
        </div>
        <div>
          <div className="grid grid-cols-2 grid-rows-1 gap-x-4">
            <SortRating></SortRating>
            <SortDate></SortDate>
          </div>
          <ReviewItem></ReviewItem>
          <ReviewItem></ReviewItem>
        </div>
        <Button
          variant="contained"
          fullWidth
          sx={{
            margin: "20px 0 0 0",
            background: "#343233",
            textTransform: "none",
            fontWeight: "600",
          }}
          onClick={handleOpenAddModal}
        >
          Write a review
        </Button>
      </div>
    </Overlay>
  );
};

export default ReviewModal;
