import { TextField } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

const ProdInventory = () => {
  const { control, watch } = useFormContext();
  const hasVariants = watch("hasVariants");

  if (hasVariants) return null;

  return (
    <div className="w-full rounded-lg mb-2 p-3">
      <p className="font-medium text-lg text-start">
        Inventory <span className="text-red-600"> *</span>
      </p>
      <div className="border-[2px] border-solid mt-3 border-gray-200 shadow-sm rounded-lg p-5 h-full">
        <div className="flex gap-3">
          <div className="w-1/2">
            <p className="my-0 pb-1 text-[#212020] text-sm text-start">
              Quantity <span className="text-red-600"> *</span>
            </p>
            <Controller
              name="quantityAvailable"
              control={control}
              rules={{ required: "Quantity is required" }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  fullWidth
                  required
                  size="small"
                  type="number"
                  error={!!error}
                  helperText={error?.message}
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "." || e.key === ",") {
                      e.preventDefault();
                      return;
                    }
                  }}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
          </div>
          <div className="w-1/2">
            <p className="my-0 pb-1 text-[#212020] text-sm text-start">
              SKU (optional)
            </p>
            <Controller
              name="sku"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  fullWidth
                  size="small"
                  onChange={(e) => field.onChange(e.target.value || "")}
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdInventory;
