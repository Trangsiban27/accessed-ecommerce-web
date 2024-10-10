import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setIsShowModal } from "../store/slices/ReviewSlice";

const Overlay = ({ children, handleClose }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50"
      onClick={() => {
        handleClose(dispatch(setIsShowModal(false)));
      }}
    >
      {children}
    </div>
  );
};

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
  handleClose: PropTypes.func.isRequired, // Function to close the modal when clicked outside of it.
};

export default Overlay;
