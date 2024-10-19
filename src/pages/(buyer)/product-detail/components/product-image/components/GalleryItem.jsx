import PropTypes from "prop-types";

const GalleryItem = (props) => {
  const { selected, onClick, onHover, slide } = props;

  return (
    <div
      className={"embla-thumbs__slide".concat(
        selected ? " embla-thumbs__slide--selected" : ""
      )}
    >
      <button
        onClick={onClick}
        onMouseEnter={onHover}
        type="button"
        className="embla-thumbs__slide__number"
      >
        <img src={slide} alt="" />
      </button>
    </div>
  );
};

GalleryItem.propTypes = {
  selected: PropTypes.bool,
  index: PropTypes.number,
  onClick: PropTypes.func,
  onHover: PropTypes.func,
  slide: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }),
};

export default GalleryItem;
