import { useDispatch, useSelector } from "react-redux";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { updateProductField } from "../../../../store/slices/ProductSlice";

const ProdSellingType = () => {
  const dipatch = useDispatch();
  const sellingType = useSelector((state) => state.product.sellingType);

  const handleChange = (event) => {
    dipatch(
      updateProductField({ field: "sellingType", value: event.target.value })
    );
  };

  return (
    <div className="w-full rounded-lg mb-2 p-3">
      <p className="font-medium text-lg">
        Selling Type <span className="text-red-600"> *</span>
      </p>
      <div className="border-[2px] border-solid border-gray-200 shadow-sm rounded-lg p-5 py-2 h-full flex gap-3 text-sm">
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={sellingType === "In-store selling only"}
                onChange={handleChange}
                size="small"
                value="In-store selling only"
              />
            }
            label={<span className="text-sm">In-store selling only</span>}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={sellingType === "Online selling only"}
                onChange={handleChange}
                value="Online selling only"
                size="small"
              />
            }
            label={<span className="text-sm">Online selling only</span>}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={sellingType === "Available both online and in-store"}
                size="small"
                onChange={handleChange}
                value="Available both online and in-store"
              />
            }
            label={
              <span className="text-sm">
                Available both online and in-store
              </span>
            }
          />
        </FormGroup>
      </div>
    </div>
  );
};

export default ProdSellingType;
