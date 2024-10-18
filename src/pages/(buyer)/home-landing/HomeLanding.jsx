import { useEffect, useState } from "react";
import Banner from "./components/Banner";
import Categories from "./components/Categories";
import FeaturedProduct from "../../../components/product/FeaturedProduct";
import axios from "axios";

const HomeLanding = () => {
  const [productData, setProductData] = useState([]);
  console.log("data", productData);

  useEffect(() => {
    // if (hasFetched.current) return; //
    // hasFetched.current = true;

    const getAllProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProductData(response.data);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    getAllProducts();
  }, []);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;

  return (
    <div className="mx-auto w-[80%]">
      <Banner></Banner>
      <Categories></Categories>
      <FeaturedProduct
        nameTitle="Popular Product"
        productData={productData}
      ></FeaturedProduct>
      <FeaturedProduct
        nameTitle="Feature Product"
        productData={productData}
      ></FeaturedProduct>
    </div>
  );
};
export default HomeLanding;
