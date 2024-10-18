import axios from "axios";

export const getTopProducts = () => {
  return axios.get(
    ` https://neo4j-ecommerce.onrender.com/api/v1/products/top-selling?page=0&size=20`
  );
};
