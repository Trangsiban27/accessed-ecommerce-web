import { useState } from "react";
import Variant from "./components/Variant";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setSelectedPrimaryVariant } from "../../../../../../../store/slices/ProductDetailSlice";

const ProductVariant = ({ options = [], primaryVariantType }) => {
  const [selectedVariant, setSelectedVariant] = useState({});
  const [primaryVariantSelected, setPrimaryVariantSelected] = useState("");
  const dispatch = useDispatch();

  const handleVariantSelect = (variantType, value) => {
    setSelectedVariant((prevSelectedVariants) => ({
      ...prevSelectedVariants,
      [variantType]: value, // Cập nhật giá trị cho variant type cụ thể
    }));

    if (variantType === primaryVariantType) {
      setPrimaryVariantSelected({ type: variantType, value });
      dispatch(setSelectedPrimaryVariant(primaryVariantSelected));
    }
  };

  console.log("primaryVariantSelected", selectedVariant);

  return (
    <div className="flex flex-col w-full mt-5 text-start gap-y-6">
      {Object.keys(options)?.map((variant) => (
        <Variant
          key={variant}
          variantType={variant}
          variantValue={options[variant]}
          onVariantSelected={handleVariantSelect}
        ></Variant>
      ))}
    </div>
  );
};

ProductVariant.propTypes = {
  options: PropTypes.object.isRequired,
  primaryVariantType: PropTypes.string.isRequired,
};

export default ProductVariant;
