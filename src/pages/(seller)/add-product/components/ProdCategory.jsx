import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFormContext, Controller } from "react-hook-form";
import {
  getCagegories,
  getSubCategoriesById,
} from "../../../../services/categoriesService";

import {
  Box,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  FormHelperText,
  Switch,
} from "@mui/material";

const createInitialSpecifications = (specificationOptions) =>
  specificationOptions?.map((item) => ({
    key: item,
    value: "",
  }));

const createInitialVariants = (variantOptions) =>
  variantOptions?.map((item) => ({
    type: item,
    values: [],
  }));

const ProdCategory = () => {
  const {
    control,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();
  const categoryIds = useSelector((state) => state.product.categoryIds);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const categoryRef = watch("category");

  useEffect(() => {
    const response = getCagegories();
    if (response?.data) setCategories(response.data);
  }, []);

  useEffect(() => {
    const categoryId = getValues("category")?.id;
    if (!categoryId) return;
    const response = getSubCategoriesById(categoryId);
    if (response?.data) setSubCategories(response?.data);
  }, [categoryRef, getValues]);

  useEffect(() => {
    const mainCategory = getValues("subCategory") || getValues("category");
    if (!mainCategory) return;

    const initialVariants = createInitialVariants(mainCategory?.variantOptions);
    const initialSpecifications = createInitialSpecifications(
      mainCategory?.specificationOptions
    );
    setValue("variants", initialVariants);
    setValue("specifications", initialSpecifications);
    setValue("primaryVariantType", initialVariants[0].type);
  }, [categoryRef, setValue, getValues]);

  return (
    <div className="w-full rounded-lg mb-2 p-3">
      <p className="font-medium text-lg text-start">
        Category <span className="text-red-600"> *</span>
      </p>
      <div className="border-[2px] border-solid mt-3 border-gray-200 shadow-sm rounded-lg p-5 h-full flex flex-col gap-3">
        <div>
          <p className="my-0 mb-1 text-[#212020] text-sm text-start">
            Product categories
            <span className="text-red-600"> *</span>
          </p>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <FormControl className="w-full" error={!!errors.mainCategory}>
                <Select
                  {...field}
                  className="h-[40px] w-full cursor-pointer"
                  id="main-category-select"
                  input={<OutlinedInput />}
                  displayEmpty
                  error={!!errors.category}
                  helperText={errors.name?.category}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      <span className="text-sm font-medium">
                        {
                          categories.find((item) => item.id === selected?.id)
                            ?.name
                        }
                      </span>
                    </Box>
                  )}
                >
                  {categories.map((item) => (
                    <MenuItem key={item.id} value={item}>
                      {item?.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.category && (
                  <p className="text-red-600 text-start text-sm my-1">
                    {errors.category.message}
                  </p>
                )}
              </FormControl>
            )}
          />
        </div>

        <div className="mt-2">
          <p className="my-0 mb-1 text-[#212020] text-sm text-start">
            {categories.find((item) => item.id === categoryIds[0])?.name ||
              "Product"}
            {"'s"} categories
          </p>
          <Controller
            name="subCategory"
            control={control}
            render={({ field }) => (
              <FormControl
                className="w-full relative"
                error={!!errors.subCategory}
              >
                {subCategories?.length === 0 && (
                  <div className="absolute z-100 cursor-not-allowed top-0 right-0 left-0 bottom-0 flex items-center justify-start px-3 bg-slate-100 text-sm font-light text-gray-300">
                    No sub-category
                  </div>
                )}
                <Select
                  {...field}
                  displayEmpty
                  input={<OutlinedInput />}
                  disabled={subCategories?.length === 0}
                  className="h-[40px] w-full cursor-pointer"
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      <span className="text-sm font-medium">
                        {
                          subCategories.find((item) => item.id === selected?.id)
                            ?.name
                        }
                      </span>
                    </Box>
                  )}
                >
                  {subCategories?.map((item) => (
                    <MenuItem key={item.id} value={item}>
                      {item?.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.subCategory && (
                  <FormHelperText>{errors.subCategory.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />
        </div>

        <div className="flex items-center justify-start gap-3 w-1/2">
          <label>
            <span
              aria-label="hasVariants"
              className="cursor-pointer font-medium"
            >
              Have variants?
            </span>
          </label>
          <Controller
            name="hasVariants"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Switch
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
                id="hasVariants"
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ProdCategory;
