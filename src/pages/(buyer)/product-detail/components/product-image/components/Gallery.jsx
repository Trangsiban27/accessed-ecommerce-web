import PropTypes from "prop-types";
import GalleryItem from "./GalleryItem";

const Gallery = ({
  emblaThumbsRef,
  slides,
  onThumbClick,
  selectedIndex,
  onThumbHover,
}) => {
  return (
    <div className="gallery-thumbs">
      <div className="gallery-thumbs__viewport" ref={emblaThumbsRef}>
        <div className="gallery-thumbs__container">
          {slides.map((slide, index) => (
            <GalleryItem
              key={index}
              onClick={() => onThumbClick(index)}
              onHover={() => onThumbHover(index)}
              selected={index === selectedIndex}
              index={index}
              slide={slide}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

Gallery.propTypes = {
  emblaThumbsRef: PropTypes.object.isRequired,
  slides: PropTypes.arrayOf(PropTypes.object).isRequired,
  onThumbClick: PropTypes.func.isRequired,
  onThumbHover: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number.isRequired,
};

export default Gallery;
