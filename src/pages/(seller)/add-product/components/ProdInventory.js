import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateProductField } from "../../../../store/slices/ProductSlice";

const ProdInventory = () => {
  const dispatch = useDispatch();
  const inventory = useSelector((state) => state.product.inventory);
  const hasVariants = useSelector((state) => state.product.hasVariants);

  function updateField(field, value) {
    dispatch(updateProductField({ field, value }));
  }

  if (hasVariants) return <></>;

  return (
    <div className="w-full rounded-lg mb-2 p-3">
      <p className="font-medium text-lg">
        Inventory <span className="text-red-600"> *</span>
      </p>
      <div className="border-[2px] border-solid border-gray-200 shadow-sm rounded-lg p-5 h-full">
        <div className="flex gap-3">
          <div className="w-1/2">
            <p className="my-0 pb-1 text-[#797474] text-sm">
              Quantity <span className="text-red-600"> *</span>
            </p>
            <TextField
              variant="outlined"
              fullWidth
              required
              size="small"
              type="number"
              value={inventory.quantity}
              onKeyDown={(e) => {
                if (e.key === "-" || e.key === "." || e.key === ",") {
                  e.preventDefault();
                  return;
                }
              }}
              onChange={(e) =>
                updateField("inventory", {
                  ...inventory,
                  quantity: Number(e.target.value) || null,
                })
              }
            />
          </div>
          <div className="w-1/2">
            <p className="my-0 pb-1 text-[#797474] text-sm">SKU (optional)</p>
            <TextField
              variant="outlined"
              fullWidth
              required
              size="small"
              value={inventory.sku}
              onChange={(e) =>
                updateField("inventory", {
                  ...inventory,
                  sku: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdInventory;
