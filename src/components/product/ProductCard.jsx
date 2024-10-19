import { useState } from "react";
import { useNavigate } from "react-router-dom";

import StarIcon from "@mui/icons-material/Star";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Typography } from "@mui/material";

const ProductCard = ({ product }) => {
  const {
    id,
    name,
    brandName,
    maxSellingPrice,
    maxDiscountedPrice,
    sumSoldQuantity,
    image,
    avgRating,
  } = product;

  const [favorites, setFavorites] = useState({});

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${id}`);
  };

  const handleAddFavorite = (productId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [productId]: !prevFavorites[productId],
    }));
  };

  const handleAddToCart = (productName) => {
    alert(`${productName} added to cart!`);
  };

  const formatSoldQuantity = (quantity) => {
    if (quantity >= 1000) {
      return `${Math.floor(quantity / 1000)}K`;
    }
    return quantity || "N/A";
  };

  return (
    <div>
      <div onClick={handleClick} className="cursor-pointer">
        <div
          className={`rounded-[10px] h-[250px] flex justify-center items-center product-id-${id} relative`}
        >
          <img
            src={image}
            alt={name}
            className="max-w-[200px] max-h-[200px] bg-[#efefef] object-cover"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddFavorite(id);
            }}
            className="absolute p-2 bg-white rounded-full top-3 left-3"
          >
            {favorites[id] ? (
              <FavoriteIcon sx={{ color: "rgb(247 74 73)" }} />
            ) : (
              <FavoriteBorderIcon
                sx={{ "&:hover": { color: "rgb(247 74 73)" } }}
              />
            )}
          </button>
        </div>
      </div>

      <div className="flex-grow">
        <Typography
          variant="h6"
          sx={{ fontWeight: "600", marginTop: 1 }}
          className="truncate"
        >
          {name}
        </Typography>

        <Typography variant="caption" gutterBottom className="text-zinc-400">
          {brandName || "N/A"}
        </Typography>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex justify-between gap-2 mt-2">
              <StarIcon style={{ color: "#FF9A27" }} />
              <p>{avgRating ? avgRating.rate : "N/A"}</p>
              <p className="leading-snug">|</p>
              <p className="px-2 rounded-md bg-slate-300 text-nowrap	">
                {formatSoldQuantity(sumSoldQuantity)} Sold
              </p>
            </div>
            <div className="flex gap-4 mt-2">
              <p className="line-through text-zinc-400">${maxSellingPrice}</p>
              <p className="font-bold price">${maxDiscountedPrice}</p>
            </div>
          </div>

          <div
            className="cursor-pointer add-to-cart"
            onClick={() => handleAddToCart(name)}
          >
            +
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
