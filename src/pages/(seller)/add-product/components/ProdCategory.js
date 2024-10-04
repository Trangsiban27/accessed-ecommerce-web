import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import {
  initialVariants,
  setPrimaryVariant,
} from "../../../../store/slices/variantsSlice";
import { getCategories, getCategoryById } from "../../../../api/CategoryApi";
import { constant_category } from "../../../../constants/constant_category";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { updateProductField } from "../../../../store/slices/ProductSlice";

const ProdCategory = () => {
  const dispatch = useAppDispatch();
  const categoryIds = useAppSelector((state) => state.product.categoryIds);
  const [subCategory, setSubCategory] = useState([]);
  const [categories, setCategories] = useState(constant_category);

  const handleChange = (value, level) => {
    if (value === "") {
      dispatch(
        updateProductField({
          field: "categoryIds",
          value: {
            ...categoryIds,
            [level]: { name: null, index: null },
          },
        })
      );
    } else {
      const values = value.split(" and ");
      dispatch(
        updateProductField({
          field: "categoryIds",
          value: {
            ...categoryIds,
            [level]: { name: values[0], index: values[1] },
          },
        })
      );
    }
  };

  useEffect(() => {
    const selectedCategory = categories.find(
      (item) => item.name === categoryIds.id
    );
    handleChange("", "level_2");
    setSubCategory(selectedCategory?.subCategories || []);
  }, [categoryIds.level_1]);
 
  useEffect(() => {
    const callApi = async () => {
      try {
        const response_data = await getCategories();
        setCategories(response_data);
      } catch (error) {
        console.log(error.message);
      }
    };
    callApi();
  }, []);

  useEffect(() => {
    const getCategoryVariants = async (categoryName, id) => {
      const callApi = async () => {
        try {
          const response = await getCategoryById(id);
          const variants = response.variantTypes.map((item, index) => ({
            id: index,
            type: item.type,
            values: [],
          }));

          const specification = {};
          response.specificationTypes.forEach((item) => {
            specification[item.specificationType] = "";
          });

          console.log(specification, variants);
          dispatch(initialVariants({ variants }));

          dispatch(setPrimaryVariant({ variant: variants[0].type }));
          dispatch(
            updateProductField({
              field: "specification",
              value: specification,
            })
          );
        } catch (error) {
          console.log(error?.message);
        }
      };
      callApi();
    };

    const categoryName = category.level_2.name || category.level_1.name;
    const categoryId = category.level_2.index || category.level_1.index;

    if (categoryName && categoryId) {
      getCategoryVariants(categoryName, categoryId ? categoryId : "");
    }
  }, [category]);

  return (
    <div className="w-full rounded-lg mb-2 p-3">
      <p className="font-medium text-lg">
        Category <span className="text-red-600"> *</span>
      </p>
      <div className="border-[2px] border-solid border-gray-200 shadow-sm rounded-lg p-5 h-full flex flex-col gap-3">
        <div>
          <p className="my-0 mb-1 text-[#797474] text-sm">
            Product category
            <span className="text-red-600"> *</span>
          </p>
          <FormControl className="w-full">
            <Select
              id="demo-multiple-chip"
              inputProps={{ "aria-label": "Without label" }}
              value={category.level_1 || ""}
              onChange={(e) => handleChange(String(e.target.value), "level_1")}
              input={<OutlinedInput id="select-multiple-chip" />}
              className="h-[40px] w-full cursor-pointer"
              renderValue={() => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  <span className="text-sm font-medium">
                    {category.level_1.name}
                  </span>
                </Box>
              )}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 48 * 4.5 + 8,
                    width: 250,
                  },
                },
              }}
              displayEmpty
            >
              {categories.map((item) => (
                <MenuItem key={item.id} value={`${item.name} and ${item.id}`}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="mt-2">
          <p className="my-0 mb-1 text-[#797474] text-sm">
            {category.level_1.name || "Product"} sub-category
          </p>
          <FormControl className="w-full relative">
            {subCategory.length === 0 && (
              <div className="absolute z-100 cursor-not-allowed top-0 right-0 left-0 bottom-0 flex items-center justify-center bg-slate-100 text-sm font-light text-gray-300 ">
                no sub-category
              </div>
            )}
            <Select
              disabled={subCategory.length === 0}
              id="demo-multiple-chip"
              inputProps={{ "aria-label": "Without label" }}
              value={category.level_2 || ""}
              onChange={(e) => handleChange(String(e.target.value), "level_2")}
              input={<OutlinedInput id="select-multiple-chip" />}
              className="h-[40px] w-full cursor-pointer"
              renderValue={() => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  <span className="text-sm font-medium">
                    {category.level_2.name}
                  </span>
                </Box>
              )}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 48 * 4.5 + 8,
                    width: 250,
                  },
                },
              }}
              displayEmpty
            >
              {subCategory.map((item) => (
                <MenuItem key={item.id} value={`${item.name} and ${item.id}`}>
                  {item.name}
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
