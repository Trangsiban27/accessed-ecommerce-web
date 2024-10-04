import {
  Divider,
  InputBase,
  MenuItem,
  Select,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProductField } from "../../../../store/slices/ProductSlice";

const ProdPackages = () => {
  const dispatch = useDispatch();
  const packages_weight = useSelector((state) => state.product.packages_weight);
  const packages_size = useSelector((state) => state.product.packages_size);
  const [unit, setUnit] = useState(packages_weight ? "Kg" : "Pound");

  const updateField = useCallback(
    (field, value) => {
      dispatch(updateProductField({ field, value }));
    },
    [dispatch]
  );

  const handleWeightChange = useCallback(
    (event) => {
      const weight = parseFloat(event.target.value) || 0;
      updateField("packages_weight", weight);
    },
    [updateField]
  );

  const handleUnitChange = useCallback((event) => {
    setUnit(event.target.value);
  }, []);

  const handleSizeChange = useCallback(
    (dimension) => (event) => {
      const value = parseFloat(event.target.value) || null;
      updateField("packages_size", {
        ...packages_size,
        [dimension]: value,
      });
    },
    [packages_size, updateField]
  );

  const preventNegativeInput = useCallback((event) => {
    if (event.key === "-" || event.key === ",") {
      event.preventDefault();
    }
  }, []);

  return (
    <div className="w-full rounded-lg mb-2 p-3">
      <p className="font-medium text-lg">Shipping and Delivery</p>
      <div className="border-[2px] border-solid border-gray-200 shadow-sm rounded-lg p-5 h-full flex flex-col gap-3 mt-5">
        <div>
          <p className="my-0 pb-1 text-[#797474] text-sm">Item weight</p>
          <div className="w-full flex items-center justify-between px-1 border-[1px] h-[40px] border-solid border-[#c8c3c3] rounded-md">
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="00.00"
              type="number"
              className="h-[40px]"
              value={packages_weight || ""}
              onChange={handleWeightChange}
              onKeyDown={preventNegativeInput}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Select
              value={unit}
              onChange={handleUnitChange}
              size="small"
              className="outline-none"
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                  height: "42px",
                },
              }}
            >
              <MenuItem value="Kg">Kg</MenuItem>
              <MenuItem value="Pound">Pb</MenuItem>
            </Select>
          </div>
        </div>
        <div>
          <div className="flex items-start justify-between gap-5 mt-4">
            {["length", "width", "height"].map((dim) => (
              <div
                key={dim}
                className="flex items-start justify-center flex-col w-1/3"
              >
                <p className="my-0 pb-1 text-[#797474] text-sm">
                  {dim.charAt(0).toUpperCase() + dim.slice(1)}
                </p>
                <TextField
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">In</InputAdornment>
                    ),
                  }}
                  size="small"
                  variant="outlined"
                  placeholder="00.00"
                  className="w-full rounded-md"
                  value={packages_size[dim] || ""}
                  onChange={handleSizeChange(dim)}
                  type="number"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdPackages;
