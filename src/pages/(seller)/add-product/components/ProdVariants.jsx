import {
  TextField,
  Chip,
  Box,
  Button,
  Stack,
  Divider,
  Checkbox,
  InputBase,
  Alert,
} from "@mui/material";
import {
  addVariantValue,
  removeVariantValue,
  setInitialVariants,
  setPrimaryVariantType,
  generateVariantOptionsTable,
  setVariantImages,
  addNewVariantImages,
  removeVariantImage,
} from "../../../../store/slices/VariantSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCT_VARIANTS } from "../../../../constants/constant_variants";
import { PlusOne } from "@mui/icons-material";
import PropTypes from "prop-types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const VariantOption = ({ type, values }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const variantImages = useSelector((state) => state.variants.variantImages);
  const primaryVariantType = useSelector(
    (state) => state.variants.primaryVariantType
  );

  useEffect(() => {
    if (type === primaryVariantType)
      dispatch(
        setVariantImages(
          values.map((item) => ({
            type,
            value: item,
            images: [],
          }))
        )
      );
  }, [dispatch, primaryVariantType, values, type]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (
      (event.key === "Enter" || event.key === ",") &&
      inputValue.trim() !== ""
    ) {
      event.preventDefault();
      if (values?.includes(inputValue.trim())) {
        return;
      }
      dispatch(addVariantValue({ type, value: inputValue.trim() }));
      setInputValue("");
    }

    if (
      event.key === "Backspace" &&
      inputValue.trim() === "" &&
      values?.length > 0
    ) {
      dispatch(removeVariantValue({ type, value: values[values.length - 1] }));
      setInputValue("");
    }
  };

  const handleInputBlur = () => {
    if (inputValue.trim() === "") return;
    if (values?.includes(inputValue.trim())) {
      return;
    }
    dispatch(addVariantValue({ type, value: inputValue.trim() }));
    setInputValue("");
  };

  return (
    <Box className="variant-option">
      <Box className="flex items-center mb-2">
        <Box className="w-[150px] flex items-center">
          <Checkbox
            checked={primaryVariantType === type}
            onChange={() => {
              dispatch(setPrimaryVariantType(type));
              dispatch(generateVariantOptionsTable());
            }}
            className="hover:bg-blue-50"
          />
        </Box>
        <InputBase
          placeholder="Enter type"
          className={`${
            primaryVariantType === type ? "border-blue-300" : "border-[#c8c3c3]"
          } w-1/4 border-solid border-2 rounded-[4px] p-[2.5px] px-3 text-[16px] transition-colors duration-200`}
          value={type}
          slotProps={{ input: { readOnly: true } }}
        />
        <Divider
          className={`w-[30px] transition-colors duration-200 ${
            values?.length > 0
              ? primaryVariantType === type
                ? "bg-blue-300"
                : "bg-gray-300"
              : "bg-white"
          }`}
        />
        <Box
          className={`relative w-full flex items-center justify-start flex-wrap gap-3 px-4 p-[2px] rounded-[4px] min-h-[40px] transition-colors duration-200 ${
            primaryVariantType === type
              ? "border-2 border-blue-300 border-solid"
              : "border-2 border-solid border-[#c8c3c3]"
          }`}
        >
          {values?.map((chip) => (
            <Chip
              key={chip}
              label={chip}
              size="small"
              className="px-1 bg-blue-50 hover:bg-blue-100"
              onDelete={() =>
                dispatch(removeVariantValue({ type, value: chip }))
              }
            />
          ))}
          <TextField
            size="small"
            variant="standard"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            onBlur={handleInputBlur}
            className="flex-grow min-w-[50px] mt-1"
            placeholder={values?.length === 0 ? "Enter values" : ""}
            InputProps={{
              disableUnderline: true,
              className: "px-2",
            }}
          />
        </Box>
        <Divider
          className={`w-[30px] transition-colors duration-200 ${
            values?.length > 0
              ? primaryVariantType === type
                ? "bg-blue-300"
                : "bg-gray-300"
              : "bg-white"
          }`}
        />
        <Button
          startIcon={show ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          onClick={() => setShow((prev) => !prev)}
          className="w-[250px] capitalize hover:bg-blue-50"
          color="primary"
          disabled={primaryVariantType !== type}
        >
          Upload Images
        </Button>
      </Box>

      {show && primaryVariantType === type && (
        <Box className="mt-4  w-full p-4 bg-gray-50 rounded-lg mb-4">
          <div
            className={`space-y-3 p-3 px-10 pb-10 image-section transition ease-in-out delay-500 
              ${show ? "show" : ""}
               ${!show ? "hidden" : ""}`}
          >
            {variantImages?.map((item) => (
              <div key={item.value} className="space-y-2">
                <p className="text-start">
                  <span className="font-bold uppercase"> {item.type} </span>:{" "}
                  {item.value}
                </p>
                <div className="grid grid-cols-5 gap-4">
                  {item.images?.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Preview`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        className="absolute -top-3 -right-3 w-6 h-6 flex items-center justify-center bg-gray-500 rounded-full cursor-pointer hover:bg-gray-500/60"
                        onClick={() => {
                          dispatch(
                            removeVariantImage({
                              value: item.value,
                              remove_image: url,
                            })
                          );
                        }}
                      >
                        <span className="text-white w-6 h-6 rounded-full">
                          X
                        </span>
                      </button>
                    </div>
                  ))}
                  <label
                    htmlFor={`file-${item.value}`}
                    className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center h-32 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <input
                      type="file"
                      id={`file-${item?.value}`}
                      accept="image/*"
                      className="hidden"
                      multiple
                      onChange={(e) => {
                        const files = Array.from(e.target.files);
                        dispatch(
                          addNewVariantImages({
                            value: item.value,
                            new_images: files.map((file) =>
                              URL.createObjectURL(file)
                            ),
                          })
                        );
                      }}
                    />
                    <PlusOne className="h-8 w-8 text-gray-400" />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </Box>
      )}

      <Divider />
    </Box>
  );
};

const ProdVariants = () => {
  const dispatch = useDispatch();
  const variants = useSelector((state) => state.variants.variants);
  const hasVariants = useSelector((state) => state.product.hasVariants);
  const categories = useSelector((state) => state.product.categories);

  useEffect(() => {
    const primaryCategory =
      categories[1]?.name?.toUpperCase() ||
      categories[0]?.name?.toUpperCase() ||
      "IPHONE";

    const productVariant = PRODUCT_VARIANTS.find(
      (item) => item.name.toUpperCase() === primaryCategory
    );

    if (productVariant?.default_variants) {
      dispatch(setInitialVariants(productVariant.default_variants));
      dispatch(setPrimaryVariantType(productVariant.default_variants[0].type));
      // dispatch(generateVariantOptionsTable());
    }
  }, [categories, dispatch]);

  if (!hasVariants) return null;

  return (
    <Box className="w-full rounded-lg mb-2 px-5">
      <p className="font-medium text-lg text-start mb-3">
        Product Variants <span className="text-red-600">*</span>
      </p>

      <Box className="border-2 border-solid border-gray-200 shadow-sm rounded-lg p-5 space-y-4">
        <div className="flex items-center w-full">
          <p className="w-[150px] text-start my-1 font-medium">Primary</p>
          <p className="w-1/4 my-1 text-start font-medium mr-[30px]">
            Variant type
          </p>
          <p className="w-full my-1 text-start font-medium mr-[30px]">
            Variant values
          </p>
          <p className="w-[250px] text-start my-1 font-medium px-2">
            Variant Images
          </p>
        </div>

        {variants?.length > 0 ? (
          <Stack spacing={2}>
            {variants.map((item, index) => (
              <VariantOption
                key={item.id || index}
                type={item.type}
                values={item.values}
              />
            ))}
          </Stack>
        ) : (
          <Alert severity="info" className="mt-4">
            No variants available. They will be loaded based on the selected
            product category.
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default ProdVariants;

VariantOption.propTypes = {
  type: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
};