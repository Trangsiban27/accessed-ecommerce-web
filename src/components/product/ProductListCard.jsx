import React from "react";

function ProductListCard({ product }) {
  return (
    <div className="flex flex-row gap-5 border border-gray-300 p-2.5 rounded w-4/5 mt-4 shadow-lg hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-shadow duration-300 hover:cursor-pointer text-start items-center">
      <div>
        <img
          src={product.image || "https://placehold.co/80x80"}
          alt={product.name}
          className="w-[80px] h-[80px] object-cover rounded-[5px]"
        />
      </div>
      <div style={{ flex: "1" }}>
        <h4 className="mb-[8px] text-[18px] font-bold text-[#333]">
          {product.name}
        </h4>
        <p className="mb-[4px] text-[14px] text-[#777]">{product.category}</p>
        <p className="mb-[4px] text-[15px] text-black">
          {product.price !== null && product.price !== undefined
            ? `$${product.price.toFixed(2)}`
            : "Price not available"}
        </p>
        <p className="text-[15px] text-black">Quantity: {product.quantity}</p>
      </div>
    </div>
  );
}

export default ProductListCard;
