import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const ProductName = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full flex flex-col rounded-lg mb-3 p-3">
      <p className="font-medium text-lg text mb-3 text-start">
        Product name <span className="text-red-600"> *</span>
      </p>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
            variant="outlined"
            required
            size="small"
          />
        )}
      />
    </div>
  );
};

export default ProductName;
