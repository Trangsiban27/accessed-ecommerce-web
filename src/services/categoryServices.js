import axios from "axios";

export const getLevel1Categories = (body) => {
  return axios.get(
    "https://neo4j-ecommerce.onrender.com/api/v1/categories/level/1",
    body
  );
};
