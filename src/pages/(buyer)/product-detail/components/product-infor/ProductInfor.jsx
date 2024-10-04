import { Button } from "@mui/material";
import Review from "../review/Review";
import ProductVariant from "./components/product-variant/ProductVariant";
import ProductInforHead from "./components/ProductInforHead";
import ProductSpecification from "./components/ProductSpecification";

const ProductInfor = () => {
  return (
    <div className="w-2/5 h-[500px] overflow-y-scroll px-4 pb-10">
      <ProductInforHead></ProductInforHead>
      <ProductVariant></ProductVariant>
      <ProductSpecification></ProductSpecification>
      <Review></Review>
      <Button
        variant="contained"
        fullWidth
        sx={{
          background: "#000",
          mt: "20px",
          fontWeight: "600",
          padding: "12px",
          borderRadius: "10px",
        }}
      >
        Add to cart
      </Button>
    </div>
  );
};

export default ProductInfor;
