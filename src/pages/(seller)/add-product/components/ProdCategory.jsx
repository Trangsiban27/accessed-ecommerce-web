import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { getCagegories, getSubCategoriesById } from "../../../../services/categoriesService";
import { setProductField } from "../../../../store/slices/productSlice";

const ProdCategory = () => {
  const dispatch = useDispatch();
  const categoryIds = useSelector((state) => state.product.categoryIds);
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const response = getCagegories();
    if (response?.data) setMainCategories(response.data);
  }, []);

  useEffect(() => {
    if (!categoryIds[0]) return;
    const response = getSubCategoriesById(categoryIds[0]);
    if (response?.data) setSubCategories(response?.data);
  }, [categoryIds]);

  useEffect(() => {
    if (categoryIds.length === 0) return;
  
    const getCategoryData = () => {
      if (categoryIds.length === 1) {
        return mainCategories.find(item => item.id === categoryIds[0]);
      }
      if (categoryIds.length === 2) {
        return subCategories.find(item => item.id === categoryIds[1]);
      }
      return null;
    };
  
    const createInitialSpecifications = (specificationOptions) => 
      specificationOptions?.map(item => ({
        key: item,
        value: ""
      }));
  
    const createInitialVariants = (variantOptions) =>
      variantOptions?.map(item => ({
        type: item,
        values: ""
      }));
  
    const category = getCategoryData();
    if (!category) return;
  
    const initialSpecifications = createInitialSpecifications(category.specificationOptions);
    const initialVariants = createInitialVariants(category.variantOptions);
    dispatch(setProductField({ field: "specifications", value: initialSpecifications }));
    dispatch(setProductField({ field: "variants", value: initialVariants }));
  
  }, [categoryIds, mainCategories, subCategories, dispatch]);

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
          <FormControl className="w-full">
            <Select
              id="demo-multiple-chip"
              inputProps={{ "aria-label": "Without label" }}
              value={categoryIds[0] || ""}
              onChange={(e) =>
                dispatch(
                  setProductField({
                    field: "categoryIds",
                    value: [e.target.value.id],
                  })
                )
              }
              input={<OutlinedInput id="select-multiple-chip" />}
              className="h-[40px] w-full cursor-pointer"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 48 * 4.5 + 8,
                    width: 250,
                  },
                },
              }}
              displayEmpty
              renderValue={() => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  <span className="text-sm font-medium">
                    {mainCategories.find(item => item.id === categoryIds[0])?.name}
                  </span>
                </Box>
              )}
            >
              {mainCategories.map((item) => (
                <MenuItem key={item.id} value={item}>
                  {item?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="mt-2">
          <p className="my-0 mb-1 text-[#212020] text-sm text-start">
            {mainCategories.find(item => item.id === categoryIds[0])?.name || "Product"}
            {"'s"} categories
          </p>
          <FormControl className="w-full relative">
            {subCategories?.length === 0 && (
              <div className="absolute z-100 cursor-not-allowed top-0 right-0 left-0 bottom-0 flex items-center justify-start px-3 bg-slate-100 text-sm font-light text-gray-300">
                No sub-category
              </div>
            )}
            <Select
              disabled={subCategories?.length === 0}
              displayEmpty
              id="demo-multiple-chip"
              inputProps={{ "aria-label": "Without label" }}
              value={categoryIds[1] || ""}
              onChange={(e) =>
                dispatch(
                  setProductField({
                    field: "categoryIds",
                    value: [categoryIds[0], e.target.value.id],
                  })
                )
              }
              input={<OutlinedInput id="select-multiple-chip" />}
              className="h-[40px] w-full cursor-pointer"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 48 * 4.5 + 8,
                    width: 250,
                  },
                },
              }}
              renderValue={() => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  <span className="text-sm font-medium">
                    {subCategories.find(item => item.id === categoryIds[1])?.name}
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
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default ProdCategory;
