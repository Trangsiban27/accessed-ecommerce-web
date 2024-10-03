import PropTypes from "prop-types";

const ImageMain = ({ image }) => {
  return (
    <div className="w-[85%] rounded-2xl overflow-hidden">
      <img src={image.url} alt="" />
    </div>
  );
};

ImageMain.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};

export default ImageMain;
