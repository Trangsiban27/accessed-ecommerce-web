import { TextField, InputAdornment, Box } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

const ProdPricing = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  const hasVariants = watch("hasVariants");

  if (hasVariants) return null;

  return (
    <div className="w-full rounded-lg mb-2 p-3">
      <p className="font-medium text-lg text-start">
        Pricing <span className="text-red-600">*</span>
      </p>
      <div className="border-[2px] border-solid mt-3 border-gray-200 shadow-sm rounded-lg p-5 h-full flex flex-col gap-3">
        <div className="w-full flex items-start justify-between gap-5 mb-2">
          {[
            { label: "Mrsp Price", name: "originalPrice" },
            { label: "Sale Price", name: "discountedPrice" },
          ].map(({ label, name }) => (
            <div key={name} className="w-full">
              <p className="my-0 pb-1 text-[#212020] text-sm text-start">
                {label}
                {name === "originalPrice" && (
                  <span className="text-red-600">*</span>
                )}
              </p>
              <Controller
                name={name}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Box className="w-[35px] h-[35px] bg-[#ebedf1] rounded-md flex items-center text-black justify-center">
                            $
                          </Box>
                        </InputAdornment>
                      ),
                      style: {
                        padding: "0 4px",
                      },
                    }}
                    type="number"
                    size="small"
                    variant="outlined"
                    placeholder="00.00"
                    className="w-full rounded-md"
                    helperText={errors[name]?.message}
                    error={!!errors[name]}
                  />
                )}
              />
            </div>
          ))}
        </div>
        <div>
          <p className="my-0 pb-1 text-[#212020] text-sm text-start">
            Price <span className="text-red-600">*</span>
          </p>
          <Controller
            name="sellingPrice"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box className="w-[35px] h-[35px] bg-[#ebedf1] rounded-md flex items-center text-black justify-center">
                        $
                      </Box>
                    </InputAdornment>
                  ),
                  style: {
                    padding: "0 4px",
                  },
                }}
                type="number"
                size="small"
                variant="outlined"
                placeholder="00.00"
                className="w-full rounded-md"
                helperText={errors.sellingPrice?.message}
                error={!!errors.sellingPrice}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ProdPricing;
