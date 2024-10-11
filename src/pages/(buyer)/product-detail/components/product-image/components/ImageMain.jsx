import PropTypes from "prop-types";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import usePrevNextButtons from "../../../../../../hooks/usePrevNextButtons";

const ImageMain = ({ emblaMainRef, slides = [], emblaApi }) => {
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="relative gallery__viewport" ref={emblaMainRef}>
      <div className="gallery__container">
        {slides?.map((slide, index) => (
          <div className="gallery__slide" key={index}>
            <img
              className="object-contain w-full h-full"
              src={slide}
              alt="product image"
            />
          </div>
        ))}
      </div>
      <button
        className="absolute p-3 -translate-y-1/2 bg-white rounded-full cursor-pointer top-1/2 left-5 bg-opacity-60 hover:bg-opacity-50"
        onClick={onPrevButtonClick}
        disabled={prevBtnDisabled}
      >
        <ChevronLeftIcon></ChevronLeftIcon>
      </button>
      <button
        className="absolute p-3 -translate-y-1/2 bg-white rounded-full cursor-pointer top-1/2 right-5 bg-opacity-60 hover:bg-opacity-50"
        onClick={onNextButtonClick}
        disabled={nextBtnDisabled}
      >
        <ChevronRightIcon></ChevronRightIcon>
      </button>
    </div>
  );
};

ImageMain.propTypes = {
  emblaMainRef: PropTypes.object.isRequired,
  slides: PropTypes.arrayOf(PropTypes.object).isRequired,
  emblaApi: PropTypes.object.isRequired,
};

export default ImageMain;
