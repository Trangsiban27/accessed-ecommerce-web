import { Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PropTypes from "prop-types";

const ProductInforHead = ({ name, brandName }) => {
  return (
    <div className="w-full">
      <Typography
        variant="h5"
        gutterBottom
        className=" text-start"
        sx={{ fontWeight: "600" }}
      >
        {name ? name : "name"}
      </Typography>

      <Typography
        variant="subtitle1"
        gutterBottom
        className=" text-start"
        sx={{ fontWeight: "600", color: "#b9b7b8" }}
      >
        {brandName ? brandName : "brandName"}
      </Typography>

      <div className="mt-6">
        <Typography
          variant="h5"
          gutterBottom
          className=" text-start"
          sx={{ fontWeight: "500", textDecoration: "line-through" }}
        >
          <AttachMoneyIcon></AttachMoneyIcon>
          100.000
        </Typography>

        <Typography
          variant="h4"
          gutterBottom
          className="text-red-500 text-start"
          sx={{ fontWeight: "600" }}
        >
          <AttachMoneyIcon></AttachMoneyIcon>
          80.000
        </Typography>
      </div>
    </div>
  );
};

ProductInforHead.propTypes = {
  name: PropTypes.string,
  brandName: PropTypes.string,
};

export default ProductInforHead;
