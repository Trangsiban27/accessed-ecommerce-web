import axios from "axios";

//get product you may aslo like
const ProductServices = {
  getProductSuggestions: async () => {
    try {
      const response = await axios.get(
        "https://neo4j-ecommerce.onrender.com/api/v1/products/top-selling?page=0&size=20"
      );
      return response.data.data.result;
    } catch (e) {
      console.log("Error getting product suggestions: ", e);
      throw e;
    }
  },
};

export default ProductServices;
