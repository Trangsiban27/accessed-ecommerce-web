import {
  TextField,
  Chip,
  Box,
  Button,
  Stack,
  Divider,
  Checkbox,
  InputBase,
} from "@mui/material";
import {
  removeVariantValue,
  setPrimaryVariant,
  setVariantType,
  setVariantValue,
  updateVariantImages,
} from "../../../../store/slices/variantsSlice";
import { PlusOne, X } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { uploadVariantImages } from "../../../../api/ProductApi";
import { useDispatch, useSelector } from "react-redux";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const VariantOption = (id, type, values) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [variantImagesList, setVariantImagesList] = useState([]);
  const primaryVariant = useSelector((state) => state.variants.primaryVariant);

  useEffect(() => {
    setVariantImagesList(
      values.map((item) => ({
        type,
        value: item,
        images: [],
      }))
    );
  }, [values, type]);

  useEffect(() => {
    dispatch(updateVariantImages({ variantImages: variantImagesList }));
  }, [variantImagesList, dispatch]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (
      (event.key === "Enter" || event.key === ",") &&
      inputValue.trim() !== ""
    ) {
      event.preventDefault();
      if (values.includes(inputValue.trim())) return;
      dispatch(setVariantValue({ id, new_value: inputValue.trim() }));
      setInputValue("");
    }

    if (
      event.key === "Backspace" &&
      inputValue.trim() === "" &&
      values.length > 0
    ) {
      dispatch(
        removeVariantValue({ id, remove_value: values[values.length - 1] })
      );
      setInputValue("");
    }
  };

  const handleInputBlur = () => {
    if (values.includes(inputValue.trim()) || inputValue.trim() === "") return;
    dispatch(setVariantValue({ id, new_value: inputValue.trim() }));
    setInputValue("");
  };

  const handleFileChange = (value) => async (event) => {
    if (event.target.files) {
      const form_data = new FormData();
      const filesArray = Array.from(event.target.files);

      filesArray.forEach((file) => {
        form_data.append("files", file);
      });

      try {
        const response = await uploadVariantImages(form_data);

        if (
          response &&
          Array.isArray(response) &&
          response.length === filesArray.length
        ) {
          const newImages = filesArray.map((file, index) => ({
            url: response[index],
            file: file,
          }));

          setVariantImagesList((prev) =>
            prev.map((item) =>
              item.value === value
                ? { ...item, images: [...item.images, ...newImages] }
                : item
            )
          );
        } else {
          console.error("Mismatch between files and response URLs");
        }
      } catch (error) {
        console.error("Error uploading images:", error);
      }
    }
  };

  const handleRemoveImage = (value, imageUrl) => {
    setVariantImagesList((prev) =>
      prev.map((item) =>
        item.value === value
          ? {
              ...item,
              images: item.images.filter((img) => img.url !== imageUrl),
            }
          : item
      )
    );
  };

  return (
    <Box>
      <div className="flex items-center">
        <Box className="w-[150px] flex items-center">
          <Checkbox
            checked={primaryVariant === type}
            onChange={() => {
              dispatch(setPrimaryVariant({ variant: type }));
            }}
          />
        </Box>
        <InputBase
          className={`w-1/4 border-2 ${
            primaryVariant === type
              ? "border-solid border-blue-300"
              : "border-solid border-[#c8c3c3]"
          } rounded-[4px] p-[2.5px] px-3 text-[16px]`}
          placeholder="Enter type"
          value={type}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
          onChange={(e) =>
            dispatch(
              setVariantType({ id: id, new_type: e.target.value.toLowerCase() })
            )
          }
        />
        <Divider
          className={`w-[30px] ${
            values.length > 0
              ? primaryVariant === type
                ? "bg-blue-300"
                : "bg-gray-300"
              : "bg-white"
          }`}
        />
        <Box
          className={`w-full flex items-center justify-start flex-wrap gap-3 px-4 p-[2px] rounded-[4px] ${
            primaryVariant === type
              ? "border-2 border-blue-300 border-solid"
              : "border-2 border-solid border-[#c8c3c3]"
          }`}
        >
          {values.map((chip) => (
            <Chip
              key={chip}
              label={chip}
              size="small"
              className="px-1"
              onDelete={() =>
                dispatch(removeVariantValue({ id, remove_value: chip }))
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
            className={`flex-grow min-w-[50px] mt-1 border-2`}
            placeholder={values.length === 0 ? "Enter values" : ""}
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Box>
        <Divider
          className={`w-[30px] ${
            values.length > 0
              ? primaryVariant === type
                ? "bg-blue-300"
                : "bg-gray-300"
              : "bg-white"
          }`}
        />
        <Button
          startIcon={show ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          onClick={() => setShow((prev) => !prev)}
          className="w-[250px] capitalize"
          color="primary"
          disabled={primaryVariant !== type}
        >
          Upload Images
        </Button>
        {/* <Divider orientation="vertical" variant="middle" flexItem />
        <Box
          className={`cursor-pointer text-red-400 flex items-center justify-center w-[120px]`}
          onClick={() => {
            dispatch(removeVariant({ id }));
          }}
        >
          <DeleteOutlineIcon />
        </Box> */}
      </div>

      {primaryVariant === type && (
        <div
          className={`space-y-3 p-3 px-10 pb-10 image-section ${
            show ? "show" : ""
          } transition ease-in-out delay-500 ${!show ? "hidden" : ""}`}
        >
          {variantImagesList.map((item) => (
            <div key={item.value} className="space-y-2">
              <p className="font-medium">
                <span className="font-bold uppercase"> {item.type} </span>:{" "}
                {item.value}
              </p>
              <div className="grid grid-cols-5 gap-4">
                {item.images?.map((subItem, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={subItem.url}
                      alt={`Preview ${subItem.file.name}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <Box
                      onClick={() => handleRemoveImage(item.value, subItem.url)}
                      className="absolute top-1 right-1 text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </Box>
                  </div>
                ))}
                <label
                  htmlFor={`file-${item.value}`}
                  className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center h-32 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="file"
                    id={`file-${item.value}`}
                    accept="image/*"
                    multiple
                    onChange={handleFileChange(item.value)}
                    className="hidden"
                  />
                  <PlusOne className="h-8 w-8 text-gray-400" />
                </label>
              </div>
            </div>
          ))}
        </div>
      )}

      <Divider className="mt-3" />
    </Box>
  );
};

const ProdVariants = () => {
  const variants = useSelector((state) => state.variants.variants);
  const hasVariants = useSelector((state) => state.product.hasVariants);

  if (!hasVariants) return <></>;

  return (
    <div className="w-full rounded-lg mb-2 px-5">
      <p className="font-medium text-lg">
        Product Variants <span className="text-red-600"> *</span>
      </p>
      <div
        className={`border-[2px] border-solid border-gray-200 shadow-sm rounded-lg p-5 h-full flex flex-col gap-3`}
      >
        <div className="flex items-center w-full">
          <p className="w-[150px] my-1 font-medium">Primary</p>
          <p className="w-1/4 my-1 font-medium mr-[30px]">Variant type</p>
          <p className="w-full my-1  font-medium mr-[30px]">Variant values</p>
          <p className="w-[250px] my-1 font-medium px-2 text-center">
            Variant Images
          </p>
          {/* <p className="w-[250px] my-1 font-medium px-2 mr-[70px] text-center">
            Variant Images
          </p> */}
        </div>

        <Stack spacing={2}>
          {variants.map((item, index) => (
            <VariantOption
              key={index}
              id={item.id}
              type={item.type}
              values={item.values}
            />
          ))}
        </Stack>

        {/* <div className="flex items-center justify-between w-full">
          <Box className="flex items-center justify-end">
            <Button
              className="capitalize m-0 p-0 font-medium"
              onClick={() => {
                dispatch(addVariant());
              }}
            >
              + Add Another Variant
            </Button>
          </Box>
        </div> */}
      </div>
    </div>
  );
};
export default ProdVariants;
