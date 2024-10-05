import ProductImage from "./components/product-image/ProductImage";
import ProductInfor from "./components/product-infor/ProductInfor";

const ProductDetail = () => {
  return (
    <div className="w-[80%] mt-10 flex gap-x-8 mx-auto">
      <ProductImage></ProductImage>
      <ProductInfor></ProductInfor>
    </div>
  );
};

export default ProductDetail;
