import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

const ONLINE = "ONLINE";
const OFFLINE = "OFFLINE";
const BOTH = "BOTH";

const ProdSellingType = () => {
  const { control } = useFormContext();

  return (
    <div className="w-full rounded-lg mb-2 p-3">
      <p className="font-medium text-lg text-start">
        Selling Type <span className="text-red-600"> *</span>
      </p>
      <div className="border-[2px] border-solid mt-3 border-gray-200 shadow-sm rounded-lg p-5 py-2 h-full flex gap-3 text-sm">
        <Controller
          name="sellingType"
          control={control}
          rules={{ required: "Selling type is required" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={value === ONLINE}
                    onChange={() => onChange(ONLINE)}
                    value={ONLINE}
                    size="small"
                  />
                }
                label={<span className="text-sm">Online selling only</span>}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={value === OFFLINE}
                    onChange={() => onChange(OFFLINE)}
                    size="small"
                    value={OFFLINE}
                  />
                }
                label={<span className="text-sm">In-store selling only</span>}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={value === BOTH}
                    size="small"
                    onChange={() => onChange(BOTH)}
                    value={BOTH}
                  />
                }
                label={
                  <span className="text-sm">
                    Available both online and in-store
                  </span>
                }
              />
              {error && (
                <span className="text-red-600 text-sm">{error.message}</span>
              )}
            </FormGroup>
          )}
        />
      </div>
    </div>
  );
};

export default ProdSellingType;
