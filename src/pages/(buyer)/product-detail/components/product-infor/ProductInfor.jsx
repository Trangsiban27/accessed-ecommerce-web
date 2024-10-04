import ProductVariant from "./components/product-variant/ProductVariant";
import ProductInforHead from "./components/ProductInforHead";
import ProductSpecification from "./components/ProductSpecification";

const ProductInfor = () => {
  return (
    <div className="w-2/5 h-[500px] overflow-y-scroll px-4 pb-10">
      <ProductInforHead></ProductInforHead>
      <ProductVariant></ProductVariant>
      <ProductSpecification></ProductSpecification>
    </div>
  );
};

export default ProductInfor;
