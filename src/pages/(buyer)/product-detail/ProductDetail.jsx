import ProductImage from "./components/product-image/ProductImage";
import ProductInfor from "./components/product-infor/ProductInfor";

const ProductDetail = () => {
  return (
    <div className="w-full max-w-[100%] mt-10 flex gap-x-8">
      <ProductImage></ProductImage>
      <ProductInfor></ProductInfor>
    </div>
  );
};

export default ProductDetail;
