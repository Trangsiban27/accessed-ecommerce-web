import {
  Divider,
  InputBase,
  MenuItem,
  Select,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

const ProdPackages = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full rounded-lg mb-2 p-3">
      <p className="font-medium text-lg text-start">Shipping and Delivery</p>
      <div className="border-[2px] border-solid mt-3 border-gray-200 shadow-sm rounded-lg p-5 h-full flex flex-col gap-3">
        <div>
          <p className="my-0 pb-1 text-[#212020] text-sm text-start">
            Item weight
          </p>
          <div className="w-full flex items-center px-1 border-[1px] h-[40px] border-solid border-[#c8c3c3] rounded-md">
            <Controller
              name="weight"
              control={control}
              render={({ field }) => (
                <InputBase
                  {...field}
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="00.00"
                  type="number"
                  className="h-[40px]"
                  error={!!errors.weight}
                  helperText={errors.weight?.message}
                />
              )}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Controller
              name="weightUnit"
              control={control}
              defaultValue="Kg"
              render={({ field }) => (
                <Select
                  {...field}
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
              )}
            />
          </div>
          {errors.weight && (
            <p className="text-red-600 text-sm mt-1">{errors.weight.message}</p>
          )}
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
                <Controller
                  name={dim}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
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
                      error={!!errors[dim]}
                      helperText={errors[dim]?.message}
                    />
                  )}
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
