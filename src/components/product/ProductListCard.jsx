import React from "react";

function ProductListCard({ product }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        border: "1px solid rgba(0, 0, 0, 0.3)",
        padding: "10px",
        borderRadius: "5px",
        width: "80%",
        marginLeft: "5rem",
        marginTop: "1rem",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div>
        {/* Display the product image */}
        <img
          src={product.image || "https://placehold.co/80x80"}
          alt={product.name}
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "5px",
            objectFit: "cover",
          }}
        />
      </div>
      <div style={{ flex: "1" }}>
        {/* Display product details */}
        <h4
          style={{
            margin: "0px 0px 8px 0px",
            fontSize: "18px",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          {product.name}
        </h4>
        <p
          style={{ margin: "0px 0px 4px 0px", fontSize: "14px", color: "#777" }}
        >
          {product.category}
        </p>
        <p
          style={{ margin: "0px 0px 4px 0px", fontSize: "15px", color: "#000" }}
        >
          {product.price !== null && product.price !== undefined
            ? `$${product.price.toFixed(2)}`
            : "Price not available"}
        </p>
        <p style={{ margin: "0px", fontSize: "15px", color: "#000" }}>
          Quantity: {product.quantity}
        </p>
      </div>
    </div>
  );
}

export default ProductListCard;
