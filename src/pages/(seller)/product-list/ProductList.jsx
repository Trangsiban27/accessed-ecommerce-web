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
    // <div className="flex bg-[#F9F9F9] w-full h-screen">
    // <div className="flex w-full bg-white h-auto">
    <div className="flex flex-col w-full h-full items-center">
      <div className="flex justify-between w-4/5 mt-[30px] items-center">
        <h3 className="text-2xl font-bold">Product List</h3>
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
    // </div>
    // </div>
  );
}

export default ProductList;
