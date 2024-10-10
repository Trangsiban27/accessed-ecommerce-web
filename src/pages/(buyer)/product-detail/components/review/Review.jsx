import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { setIsShowModal } from "../../../../../store/slices/ReviewSlice";

const Review = () => {
  const dispatch = useDispatch();

  const handleShowModal = () => {
    dispatch(setIsShowModal(true));
  };

  return (
    <div className="w-full p-4 mt-10 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">Reviews (10)</span>
        <Link to={"/"} className="font-semibold text-md">
          Write a review
        </Link>
      </div>
      <div className="flex items-center justify-between mt-5 mb-8 font-bold">
        <span>Overall rating</span>
        <span className="flex items-center text-lg gap-x-1">
          4.8 <StarIcon className="text-[#f9669a]"></StarIcon>
        </span>
      </div>
      <Button
        variant="outlined"
        fullWidth
        sx={{
          fontWeight: "600",
          border: "1px solid #000",
          color: "#000",
          borderRadius: "6px",
        }}
        onClick={handleShowModal}
      >
        Show all
      </Button>
    </div>
  );
};

export default Review;
