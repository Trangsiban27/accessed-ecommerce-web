import { useEffect, useState } from "react";
import Banner from "./components/Banner";
import Categories from "./components/Categories";
import FeaturedProduct from "../../../components/product/FeaturedProduct";
import axios from "axios";
import { getTopProducts } from "../../../services/topProductService";

const HomeLanding = () => {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log("data", productData);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const res = await getTopProducts();
        setProductData(res.data.data.result);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    getProducts();
  }, []);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;

  return (
    <div className="mx-auto w-[80%]">
      <Banner></Banner>
      <Categories></Categories>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <FeaturedProduct
          nameTitle="Popular Product"
          productData={productData}
        ></FeaturedProduct>
      )}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <FeaturedProduct
          nameTitle="Feature Product"
          productData={productData}
        ></FeaturedProduct>
      )}
    </div>
  );
};
export default HomeLanding;
