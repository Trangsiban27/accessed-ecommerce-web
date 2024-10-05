const ProductCard = () => {
  return (
    <div
      className="bg-white shadow-lg hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-shadow duration-300 rounded-xl p-3 my-5 mx-5 flex flex-col"
      key={product.id}
    >
      <div
        onClick={() => {
          window.location.href = `/ProductDetail/${product.id}`;
        }}
        className="cursor-pointer"
      >
        <div
          className={`rounded-[10px] h-[300px] flex justify-center items-center product-id-${product.id} relative`}
        >
          <img
            src={product.image}
            alt={product.title}
            className="max-w-[240px] max-h-[300px] bg-[#efefef]"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddFavorite(product.id);
            }}
            className="absolute top-3 left-3 rounded-full bg-white p-2"
          >
            {favorites[product.id] ? (
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
        <h3
          className="font-bold text-xl mt-3"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            WebkitLineClamp: 1,
            textOverflow: "ellipsis",
          }}
        >
          {product.title}
        </h3>
        <p className="text-sm text-zinc-400 mt-2">{product.category}</p>
        <div className="flex justify-between">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex justify-between gap-2 mt-2">
                <div className="flex justify-center items-center gap-1">
                  <StarIcon style={{ color: "#FF9A27" }} />
                  {/* <p>{product.productVariants.avgRating?.rate || "N/A"}</p> */}
                  <p>
                    {product.productVariants &&
                    product.productVariants.avgRating
                      ? product.productVariants.avgRating.rate
                      : "N/A"}
                  </p>
                </div>
                <p className="leading-snug">|</p>
                <p className="bg-slate-300 rounded-md px-2">
                  {product.sold || "N/A"} Sold
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <p className="line-through text-zinc-400">{product.price}</p>
                <p className="price font-bold">{product.price}</p>
              </div>
            </div>
          </div>
          <div
            className="add-to-cart cursor-pointer"
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
