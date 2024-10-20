import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setProductField } from "../../../../store/slices/productSlice";

const ProdInventory = () => {
  const dispatch = useDispatch();
  const quantityAvailable = useSelector(
    (state) => state.product.quantityAvailable
  );
  const sku = useSelector((state) => state.product.sku);

  function updateField(field, value) {
    dispatch(setProductField({ field, value }));
  }

  const hasVariants = useSelector((state) => state.product.hasVariants);
  if (hasVariants) return <></>;

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
            <TextField
              variant="outlined"
              fullWidth
              required
              size="small"
              type="number"
              value={quantityAvailable}
              onKeyDown={(e) => {
                if (e.key === "-" || e.key === "." || e.key === ",") {
                  e.preventDefault();
                  return;
                }
              }}
              onChange={(e) =>
                updateField("quantityAvailable", Number(e.target.value) || null)
              }
            />
          </div>
          <div className="w-1/2">
            <p className="my-0 pb-1 text-[#212020] text-sm text-start">
              SKU (optional)
            </p>
            <TextField
              variant="outlined"
              fullWidth
              required
              size="small"
              value={sku}
              onChange={(e) => updateField("sku", e.target.value || "")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdInventory;
