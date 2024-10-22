import React, { useEffect } from "react";
import {
  useFieldArray,
  useFormContext,
  Controller,
  useWatch,
} from "react-hook-form";
import {
  TextField,
  Chip,
  Box,
  Stack,
  Divider,
  Checkbox,
  InputBase,
  Alert,
} from "@mui/material";

import PropTypes from "prop-types";
import { generateVariantOptionsTable } from "../utils";

const VariantOption = ({ index }) => {
  const { control, watch, setValue } = useFormContext();
  const [inputValue, setInputValue] = React.useState("");

  const type = watch(`variants.${index}.type`);
  const values = watch(`variants.${index}.values`);
  const primaryVariantType = watch("primaryVariantType");

  const handleInputKeyDown = (event) => {
    if (
      (event.key === "Enter" || event.key === ",") &&
      inputValue.trim() !== ""
    ) {
      event.preventDefault();
      if (values.includes(inputValue.trim())) return;
      setValue(`variants.${index}.values`, [...values, inputValue.trim()]);
      setInputValue("");
    } else if (
      event.key === "Backspace" &&
      inputValue.trim() === "" &&
      values.length > 0
    ) {
      setValue(`variants.${index}.values`, values.slice(0, -1));
      setInputValue("");
    }
  };

  const handleInputBlur = () => {
    if (inputValue.trim() === "") return;
    if (values.includes(inputValue.trim())) return;
    setValue(`variants.${index}.values`, [...values, inputValue.trim()]);
    setInputValue("");
  };

  React.useEffect(() => {
    if (type === primaryVariantType) {
      const newVariantImages = values.map((item) => ({
        type,
        value: item,
        images: [],
      }));
      setValue("variantImages", newVariantImages);
    }
  }, [primaryVariantType, values, type, setValue]);

  return (
    <Box className="variant-option">
      <Box className="flex items-center mb-2">
        <Box className="w-[150px] flex items-center">
          <Controller
            name="primaryVariantType"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value === type}
                onChange={() => field.onChange(type)}
                className="hover:bg-blue-50"
              />
            )}
          />
        </Box>
        <Controller
          name={`variants.${index}.type`}
          control={control}
          render={({ field }) => (
            <InputBase
              {...field}
              placeholder="Enter type"
              className={`${
                primaryVariantType === type
                  ? "border-blue-300"
                  : "border-[#c8c3c3]"
              } w-1/5 border-solid border-2 rounded-[4px] p-[2.5px] px-3 text-[16px] transition-colors duration-200`}
              readOnly
            />
          )}
        />
        <Divider
          className={`w-[30px] transition-colors duration-200 ${
            values.length > 0
              ? primaryVariantType === type
                ? "bg-blue-300"
                : "bg-gray-300"
              : "bg-white"
          }`}
        />
        <Box
          className={`relative mr-3 w-full flex items-center justify-start flex-wrap gap-3 px-4 p-[2px] rounded-[4px] min-h-[40px] transition-colors duration-200 ${
            primaryVariantType === type
              ? "border-2 border-blue-300 border-solid"
              : "border-2 border-solid border-[#c8c3c3]"
          }`}
        >
          {values.map((chip) => (
            <Chip
              key={chip}
              label={chip}
              size="small"
              className="px-1 bg-blue-50 hover:bg-blue-100"
              onDelete={() => {
                setValue(
                  `variants.${index}.values`,
                  values.filter((value) => value !== chip)
                );
              }}
            />
          ))}
          <TextField
            size="small"
            variant="standard"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={handleInputKeyDown}
            onBlur={handleInputBlur}
            className="flex-grow min-w-[50px] mt-1"
            placeholder={values.length === 0 ? "Enter values" : ""}
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Box>
      </Box>

      <Divider />
    </Box>
  );
};

const ProdVariants = () => {
  const { control, setValue } = useFormContext();
  const { fields } = useFieldArray({
    control,
    name: "variants",
  });

  const variants = useWatch({ control, name: "variants" });

  useEffect(() => {
    const combinationVariantsTable = generateVariantOptionsTable(variants);
    setValue("variantOptionsTable", combinationVariantsTable);
  }, [variants, setValue]);

  return (
    <Box className="w-full rounded-lg mb-2 px-5">
      <p className="font-medium text-lg text-start mb-3">
        Product Variants <span className="text-red-600">*</span>
      </p>

      <Box className="border-2 border-solid border-gray-200 shadow-sm rounded-lg p-5 space-y-4">
        <div className="flex items-center w-full">
          <p className="w-[150px] text-start my-1 font-medium">Primary</p>
          <p className="w-1/5 my-1 text-start font-medium mr-[30px]">
            Variant type
          </p>
          <p className="w-full my-1 text-start font-medium mr-[30px]">
            Variant values
          </p>
          {/* <p className="w-[250px] text-start my-1 font-medium px-2">
            Variant Images
          </p> */}
        </div>

        {fields.length > 0 ? (
          <Stack spacing={2}>
            {fields.map((item, index) => (
              <VariantOption key={item.id} index={index} />
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
  index: PropTypes.number.isRequired,
};
