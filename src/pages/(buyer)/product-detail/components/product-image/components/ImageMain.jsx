import PropTypes from "prop-types";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const ImageMain = ({ image }) => {
  return (
    <div className="w-[85%] h-[450px] rounded-2xl overflow-hidden relative">
      <img className="object-cover w-full h-full" src={image.url} alt="" />
      <div className="absolute flex items-center justify-center p-2 -translate-y-1/2 bg-white rounded-full cursor-pointer opacity-80 top-1/2 hover:opacity-70 left-5">
        <ChevronLeftIcon></ChevronLeftIcon>
      </div>
      <div className="absolute flex items-center justify-center p-2 -translate-y-1/2 bg-white rounded-full cursor-pointer top-1/2 hover:opacity-70 right-5 opacity-80">
        <ChevronRightIcon></ChevronRightIcon>
      </div>
    </div>
  );
};

ImageMain.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};

export default ImageMain;
