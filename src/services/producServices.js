import axios from "axios";

//get product you may aslo like
const ProductServices = {
  getProductSuggestions: async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      return response.data;
    } catch (e) {
      console.log("Error getting product suggestions: ", e);
      throw e;
    }
  },
};

export default ProductServices;
