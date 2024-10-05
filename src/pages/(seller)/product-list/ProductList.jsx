import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button } from "@mui/material";
// import CreateProduct from "./createProduct/CreateProduct";
import ProductListCard from "../../../components/product/ProductListCard";

function ProductList() {
  // const width = useRef(window.innerWidth).current;

  const [products, setProducts] = useState([]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  console.log("products", products);

  const hasFetched = useRef(false); // Sử dụng useRef để ngăn chặn việc gọi API nhiều lần

  useEffect(() => {
    if (hasFetched.current) return; // Nếu API đã được gọi, không thực hiện lại
    hasFetched.current = true; // Đánh dấu API đã được gọi

    const getAllProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getAllProducts();
  }, []);

  // if (isAddingProduct) {
  //   return (
  //     <CreateProduct closeAddingProduct={() => setIsAddingProduct(false)} />
  //   );
  // }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#F9F9F9",
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          // width: width * 0.81,
          width: "100%",

          backgroundColor: "white",
          height: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            // overflow: "auto",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "82%",
              marginTop: "30px",
              alignItems: "center",
              marginLeft: "50px",
              paddingLeft: "30px",
            }}
          >
            <h3>Product List</h3>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsAddingProduct(true)}
            >
              Add Product
            </Button>
          </div>
          {isLoading ? (
            <p>Loading...</p> // Hiển thị loading khi đang tải dữ liệu
          ) : (
            products.map(
              (
                product // Hiển thị tất cả sản phẩm
              ) => (
                <ProductListCard
                  key={product.id}
                  product={{
                    name: product.title,
                    image: product.image,
                    category: product.category,
                    price: product.price,
                    quantity: product.quantity,
                  }}
                />
              )
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
