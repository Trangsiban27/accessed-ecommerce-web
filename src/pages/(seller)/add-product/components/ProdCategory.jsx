import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { constant_category } from "../../../../constants/constant_category";
import { setCategories } from "../../../../store/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";

const ProdCategory = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.product.categories);
  const [firstCategories, setFirstCategories] = useState(constant_category);
  const [secondCategories, setSecondCategories] = useState([]);

  useEffect(() => {
    // call api get categories
    setFirstCategories(constant_category);
  }, []);

  useEffect(() => {
    // call api get categories
    if (categories[0]) {
      const category_index = constant_category.findIndex(
        (item) => item.id === categories[0]?.id
      );
      setSecondCategories(
        constant_category[category_index]?.subCategories || []
      );
    }
  }, [categories]);

  const handleFirstCategoryChange = (e) => {
    dispatch(setCategories([e.target.value]));
  };

  const handleSecondCategoryChange = (e) => {
    dispatch(setCategories([...categories, e.target.value]));
  };

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
              value={categories[0] || ""}
              onChange={handleFirstCategoryChange}
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
                    {categories[0]?.name}
                  </span>
                </Box>
              )}
            >
              {firstCategories.map((item) => (
                <MenuItem key={item.id} value={item}>
                  {item?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="mt-2">
          <p className="my-0 mb-1 text-[#212020] text-sm text-start">
            {categories[0]?.name || "Product"}
            {"'s"} categories
          </p>
          <FormControl className="w-full relative">
            {secondCategories?.length === 0 && (
              <div className="absolute z-100 cursor-not-allowed top-0 right-0 left-0 bottom-0 flex items-center justify-center bg-slate-100 text-sm font-light text-gray-300">
                No sub-category
              </div>
            )}
            <Select
              disabled={secondCategories?.length === 0}
              displayEmpty
              id="demo-multiple-chip"
              inputProps={{ "aria-label": "Without label" }}
              value={categories[1] || ""}
              onChange={handleSecondCategoryChange}
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
                    {categories[1]?.name}
                  </span>
                </Box>
              )}
            >
              {secondCategories?.map((item) => (
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
