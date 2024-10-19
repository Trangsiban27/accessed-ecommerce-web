import {
  Box,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
} from "@mui/material";
import ProdCollections from "./ProdCollections";
import { useDispatch, useSelector } from "react-redux";
import { setProductField } from "../../../../store/slices/productSlice";

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

const ProdBranchFeature = () => {
  const dispatch = useDispatch();
  const brandName = useSelector((state) => state.product.brandName);
  const hasVariants = useSelector((state) => state.product.hasVariants);

  return (
    <div className="w-full rounded-lg mb-2 p-3">
      <p className="font-medium text-lg text-start">Brand and Featured</p>
      <div className="border-[2px] border-solid mt-3 border-gray-200 shadow-sm rounded-lg p-5 h-full flex flex-col gap-3">
        <div>
          <p className="my-0 mb-1 text-[#212020] text-sm text-start">
            Product brand
            <span className="text-red-600"> *</span>
          </p>
          <FormControl className="w-full">
            <Select
              id="demo-multiple-chip"
              inputProps={{ "aria-label": "Without label" }}
              value={brandName || ""}
              onChange={(e) =>
                dispatch(
                  setProductField({ field: "brandName", value: e.target.value })
                )
              }
              input={<OutlinedInput id="select-multiple-chip" />}
              className="h-[40px] w-full cursor-pointer"
              renderValue={() => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  <span className="text-sm font-medium">{brandName}</span>
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

        <div className="flex items-center justify-start gap-3 w-1/2">
          <label>
            <span
              aria-label="hasVariants"
              className="cursor-pointer font-medium"
            >
              Have variants?
            </span>
          </label>
          <Switch
            checked={hasVariants}
            id="hasVariants"
            onChange={(e) =>
              dispatch(
                setProductField({ field: "hasVariants", value: e.target.value })
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ProdBranchFeature;
