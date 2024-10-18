import { useState } from "react";
import { useNavigate } from "react-router-dom";

import StarIcon from "@mui/icons-material/Star";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Typography } from "@mui/material";

const ProductCard = ({ product }) => {
  const { id, title, category, price, sold, image, rating } = product;

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

  return (
    <div>
      <div onClick={handleClick} className="cursor-pointer">
        <div
          className={`rounded-[10px] h-[250px] flex justify-center items-center product-id-${id} relative`}
        >
          <img
            src={image}
            alt={title}
            className="max-w-[240px] max-h-[250px] bg-[#efefef] object-cover"
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
        {/* <h3
          className="mt-3 text-xl font-bold"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            WebkitLineClamp: 1,
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </h3> */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "600", marginTop: 3 }}
          className="truncate"
        >
          {title}
        </Typography>

        <Typography variant="caption" gutterBottom className="text-zinc-400">
          {category}
        </Typography>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex justify-between gap-2 mt-2">
              <StarIcon style={{ color: "#FF9A27" }} />
              <p>{rating ? rating.rate : "N/A"}</p>
              <p className="leading-snug">|</p>
              <p className="px-2 rounded-md bg-slate-300">
                {sold || "N/A"} Sold
              </p>
            </div>
            <div className="flex gap-4 mt-2">
              <p className="line-through text-zinc-400">${price}</p>
              <p className="font-bold price">${price}</p>
            </div>
          </div>

          <div
            className="cursor-pointer add-to-cart"
            onClick={() => handleAddToCart(product.title)}
          >
            +
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
