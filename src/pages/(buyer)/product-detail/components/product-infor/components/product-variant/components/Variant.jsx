import PropTypes from "prop-types";
import capitalizeFirstLetter from "../../../../../../../../utils/FormatString";
import { useState } from "react";

const Variant = ({ variantType, variantValue, onVariantSelected }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleSelectedVariant = (value) => {
    setSelectedValue(value);
    onVariantSelected(variantType, value);
  };

  return (
    <div className="w-full">
      <p>
        {capitalizeFirstLetter(variantType)}:{" "}
        <span className="font-bold text-md">
          {capitalizeFirstLetter(selectedValue)}
        </span>
      </p>

      {variantType === "COLOR" ? (
        <ul className="flex items-center mt-2 gap-x-4">
          {variantValue.map((value, index) => (
            <li
              key={index}
              className="p-6 rounded-md cursor-pointer bg-subTitle hover:opacity-75"
              onClick={() => handleSelectedVariant(value)}
            >
              {value}
            </li>
          ))}
        </ul>
      ) : (
        <ul className="flex items-center mt-2 gap-x-4">
          {variantValue.map((value, index) => (
            <li
              key={index}
              className="px-4 py-2 border-2 rounded-md cursor-pointer border-subTitle hover:opacity-75"
              onClick={() => handleSelectedVariant(value)}
            >
              {value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Variant.propTypes = {
  variantType: PropTypes.string.isRequired,
  variantValue: PropTypes.arrayOf(PropTypes.string).isRequired,
  onVariantSelected: PropTypes.func.isRequired,
};

export default Variant;
