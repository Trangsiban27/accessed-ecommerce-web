import PropTypes from "prop-types";

const Variant = ({ variantType }) => {
  return (
    <div className="w-full">
      <p>
        Color: <span className="text-lg font-bold">Titanium Yellow</span>
      </p>

      {variantType === "COLOR" ? (
        <ul className="flex items-center mt-2 gap-x-4">
          <li className="p-6 rounded-md cursor-pointer bg-subTitle hover:opacity-75"></li>
          <li className="p-6 rounded-md cursor-pointer bg-subTitle hover:opacity-75"></li>
          <li className="p-6 rounded-md cursor-pointer bg-subTitle hover:opacity-75"></li>
        </ul>
      ) : (
        <ul className="flex items-center mt-2 gap-x-4">
          <li className="px-4 py-2 border-2 rounded-md cursor-pointer border-subTitle hover:opacity-75">
            32
          </li>
          <li className="px-4 py-2 border-2 rounded-md cursor-pointer border-subTitle hover:opacity-75">
            128
          </li>
          <li className="px-4 py-2 border-2 rounded-md cursor-pointer border-subTitle hover:opacity-75">
            256
          </li>
        </ul>
      )}
    </div>
  );
};

Variant.propTypes = {
  variantType: PropTypes.string.isRequired,
};

export default Variant;
