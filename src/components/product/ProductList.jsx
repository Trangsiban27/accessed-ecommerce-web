import { Box, Typography } from "@mui/material";

const ProductList = () => {
  return (
    <div className="mt-10">
      <Typography
        variant="h5"
        gutterBottom
        className=" text-start"
        sx={{ fontWeight: "600", color: "#000" }}
      >
        You may also like
      </Typography>
      <Box></Box>
    </div>
  );
};

export default ProductList;
