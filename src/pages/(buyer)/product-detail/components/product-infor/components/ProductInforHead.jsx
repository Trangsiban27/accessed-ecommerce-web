import { Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { constant_product_detail } from "../../../../../../constants/constant_product_detail";

const ProductInforHead = () => {
  const { name, brandName } = constant_product_detail;

  return (
    <div className="w-full">
      <Typography
        variant="h5"
        gutterBottom
        className=" text-start"
        sx={{ fontWeight: "600" }}
      >
        {name}
      </Typography>

      <Typography
        variant="subtitle1"
        gutterBottom
        className=" text-start"
        sx={{ fontWeight: "600", color: "#b9b7b8" }}
      >
        {brandName}
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

export default ProductInforHead;
