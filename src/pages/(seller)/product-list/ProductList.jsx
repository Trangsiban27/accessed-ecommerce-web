import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button, List, Typography } from "@mui/material";
// import CreateProduct from "./createProduct/CreateProduct";
import ProductListCard from "../../../components/product/ProductListCard";

const ProductList = () => {
  // const width = useRef(window.innerWidth).current;

  const [products, setProducts] = useState([]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  console.log("products", products);

  const handleShowMore = () => {
    setVisibleProducts((prev) => prev + 5);
  };

  // const hasFetched = useRef(false); // Sử dụng useRef để ngăn chặn việc gọi API nhiều lần

  useEffect(() => {
    // if (hasFetched.current) return; //
    // hasFetched.current = true;

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
    <div className="flex flex-col w-full h-full items-center">
      <div className="flex justify-between w-4/5 mt-[30px] items-center">
        <Typography variant="h5" sx={{ fontWeight: "600" }}>
          Product List
        </Typography>
        <Button
          variant="contained"
          color="primary"
          // onClick={() => setIsAddingProduct(true)}
        >
          Add Product
        </Button>
      </div>
      <List className="w-4/5">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          products
            .slice(0, visibleProducts)
            .map((item) => <ProductListCard key={item.id} product={item} />)
        )}
      </List>
      {visibleProducts < products.length && (
        <Button onClick={handleShowMore} variant="outlined" className="mt-4">
          Xem thêm
        </Button>
      )}
    </div>
  );
};

export default ProductList;
