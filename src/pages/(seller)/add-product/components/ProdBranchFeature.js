import {
  Box,
  Checkbox,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { updateProductField } from "../../../../store/slices/ProductSlice";

import ProdCollections from "./ProdCollections";

const ProdBranchFeature = () => {
  const dispatch = useAppDispatch();
  const brand = useAppSelector((state) => state.product.brand);
  const isFeatured = useAppSelector((state) => state.product.isFeatured);
  const hasVariants = useAppSelector((state) => state.product.hasVariants);

  return (
    <div className="w-full rounded-lg mb-2 p-3">
      <p className="font-medium text-lg">Brand and Featured</p>
      <div className="border-[2px] border-solid border-gray-200 shadow-sm rounded-lg p-5 h-full flex flex-col gap-3">
        <div>
          <p className="my-0 mb-1 text-[#797474] text-sm">
            Product brand
            <span className="text-red-600"> *</span>
          </p>
          <FormControl className="w-full">
            <Select
              id="demo-multiple-chip"
              inputProps={{ "aria-label": "Without label" }}
              value={brand || ""}
              onChange={(e) =>
                dispatch(
                  updateProductField({
                    field: "brand",
                    value: String(e.target.value),
                  })
                )
              }
              input={<OutlinedInput id="select-multiple-chip" />}
              className="h-[40px] w-full cursor-pointer"
              renderValue={() => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  <span className="text-sm font-medium">{brand}</span>
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
              {phoneBrands.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <ProdCollections />

        <div className="flex items-start justify-between mt-1">
          <div className="flex items-center justify-start gap-3 w-1/2">
            <label>
              <span
                aria-label="hasVariants"
                className="cursor-pointer font-medium text-sm"
              >
                Have variants?
              </span>
            </label>
            <Switch
              checked={hasVariants}
              id="hasVariants"
              onChange={(e) => {
                dispatch(
                  updateProductField({
                    field: "hasVariants",
                    value: e.target.checked,
                  })
                );
              }}
            />
          </div>
          <div className="w-1/2 flex items-center justify-end">
            <span
              aria-label="isFeatured"
              className="cursor-pointer text-[#797474] text-sm"
            >
              Featured product
            </span>
            <Checkbox
              checked={isFeatured}
              id="isFeatured"
              size="small"
              onClick={() =>
                dispatch(
                  updateProductField({
                    field: "isFeatured",
                    value: !isFeatured,
                  })
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdBranchFeature;

const phoneBrands = [
  "Apple",
  "Samsung",
  "Xiaomi",
  "Oppo",
  "Vivo",
  "Realme",
  "Huawei",
  "OnePlus",
];
