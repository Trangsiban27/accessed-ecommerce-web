import Variant from "./components/Variant";

const ProductVariant = () => {
  return (
    <div className="flex flex-col w-full mt-5 text-start gap-y-6">
      <Variant variantType="COLOR"></Variant>
      <Variant variantType="STORE"></Variant>
      <Variant variantType="RAM"></Variant>
    </div>
  );
};

export default ProductVariant;
