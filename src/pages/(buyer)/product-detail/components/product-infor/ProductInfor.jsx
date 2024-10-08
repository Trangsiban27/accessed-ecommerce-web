import { Button } from "@mui/material";
import Review from "../review/Review";
import ProductVariant from "./components/product-variant/ProductVariant";
import ProductInforHead from "./components/ProductInforHead";
import ProductSpecification from "./components/ProductSpecification";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";

const ProductInfor = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="w-2/5 h-[500px] overflow-y-scroll px-4 pb-10">
      <ProductInforHead></ProductInforHead>

      <ProductVariant></ProductVariant>

      <ProductSpecification></ProductSpecification>

      <Review></Review>

      <div className="flex items-center justify-center gap-x-2">
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
        <Button
          variant="outlined"
          sx={{
            mt: "20px",
            fontWeight: "600",
            padding: "12px 10px",
            borderRadius: "10px",
            borderColor: "#000",
          }}
          onClick={() => handleFavorite()}
        >
          {isFavorite ? (
            <FavoriteIcon sx={{ color: "#f9669a" }}></FavoriteIcon>
          ) : (
            <FavoriteBorderIcon sx={{ color: "#000" }}></FavoriteBorderIcon>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProductInfor;
