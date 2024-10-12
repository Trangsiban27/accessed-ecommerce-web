import { useEffect, useState } from "react";
import Banner from "./components/Banner";
import Categories from "./components/Categories";
import FeatureProduct from "./components/FeatureProduct";
import axios from "axios";

const HomeLanding = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
      <FeatureProduct
        nameTitle="Popular Product"
        productData={productData}
      ></FeatureProduct>
      <FeatureProduct
        nameTitle="Feature Product"
        productData={productData}
      ></FeatureProduct>
    </div>
  );
};
export default HomeLanding;
