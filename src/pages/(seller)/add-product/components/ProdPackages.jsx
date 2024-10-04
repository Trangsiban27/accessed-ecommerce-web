import {
  Divider,
  InputBase,
  MenuItem,
  Select,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setProductField } from "../../../../store/slices/productSlice";

const ProdPackages = () => {
  const dispatch = useDispatch();
  const weight = useSelector((state) => state.product.weight);
  const length = useSelector((state) => state.product.length);
  const height = useSelector((state) => state.product.height);
  const breadth = useSelector((state) => state.product.breadth);
  const weightUnit = useSelector((state) => state.product.weightUnit);

  const handleDimensionChange = (dimension, value) => {
    dispatch(setProductField({ field: dimension, value }));
  };

  const handleWeightUnitChange = (e) => {
    dispatch(setProductField({ field: "weightUnit", value: e.target.value }));
  };

  return (
    <div className="w-full rounded-lg mb-2 p-3">
      <p className="font-medium text-lg text-start">Shipping and Delivery</p>
      <div className="border-[2px] border-solid mt-3 border-gray-200 shadow-sm rounded-lg p-5 h-full flex flex-col gap-3">
        <div>
          <p className="my-0 pb-1 text-[#212020] text-sm text-start">
            Item weight
          </p>
          <div className="w-full flex items-center justify-between px-1 border-[1px] h-[40px] border-solid border-[#c8c3c3] rounded-md">
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="00.00"
              type="number"
              className="h-[40px]"
              value={weight}
              onChange={(e) =>
                dispatch(
                  setProductField({ field: "weight", value: e.target.value })
                )
              }
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Select
              size="small"
              className="outline-none"
              value={weightUnit || "Kg"}
              onChange={handleWeightUnitChange}
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
                <p className="my-0 pb-1 text-[#212020] text-sm">
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
                  type="number"
                  value={
                    dim === "length"
                      ? length
                      : dim === "width"
                      ? breadth
                      : height
                  }
                  onChange={(e) => handleDimensionChange(dim, e.target.value)}
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
