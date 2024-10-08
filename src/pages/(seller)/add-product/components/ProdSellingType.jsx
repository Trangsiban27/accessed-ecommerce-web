import { useDispatch, useSelector } from "react-redux";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { updateProductField } from "../../../../servicea/productService";

// Define the constants
const ONLINE = "Online selling only";
const OFFLINE = "In-store selling only";
const BOTH = "Available both online and in-store";

const ProdSellingType = () => {
  const dispatch = useDispatch();
  const sellingType = useSelector((state) => state.product.sellingType);

  return (
    <div className="w-full rounded-lg mb-2 p-3">
      <p className="font-medium text-lg text-start">
        Selling Type <span className="text-red-600"> *</span>
      </p>
      <div className="border-[2px] border-solid mt-3 border-gray-200 shadow-sm rounded-lg p-5 py-2 h-full flex gap-3 text-sm">
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={sellingType === "ONLINE"}
                onChange={() =>
                  updateProductField(dispatch, "sellingType", "ONLINE")
                }
                value={ONLINE}
                size="small"
              />
            }
            label={<span className="text-sm">Online selling only</span>}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={sellingType === "OFFLINE"}
                onChange={() =>
                  updateProductField(dispatch, "sellingType", "OFFLINE")
                }
                size="small"
                value={OFFLINE}
              />
            }
            label={<span className="text-sm">In-store selling only</span>}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={sellingType === "BOTH"}
                size="small"
                onChange={() =>
                  updateProductField(dispatch, "sellingType", "BOTH")
                }
                value={BOTH}
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
