import { useDispatch, useSelector } from "react-redux";
import { TextField, InputAdornment, Box } from "@mui/material";
import { updateProductField } from "../../../../store/slices/ProductSlice";

const ProdPricing = () => {
  const dispatch = useDispatch();
  const pricing = useSelector((state) => state.product.pricing);
  const hasVariants = useSelector((state) => state.product.hasVariants);

  if (hasVariants) return <></>;

  return (
    <div className="w-full rounded-lg mb-2 p-3">
      <p className="font-medium text-lg">
        Pricing <span className="text-red-600">*</span>
      </p>
      <div className="border-[2px] border-solid border-gray-200 shadow-sm rounded-lg p-5 h-full flex flex-col gap-3">
        <div className="w-full flex items-center justify-between gap-5 mb-2">
          {["MSRP Price", "Sale Price"].map((label) => (
            <div key={label} className="w-full">
              <p className="my-0 pb-1 text-[#797474] text-sm">
                {label}
                {label === "MSRP Price" && (
                  <span className="text-red-600">*</span>
                )}
              </p>
              <TextField
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
                value={pricing[label === "MSRP Price" ? "mrsp" : "sale_price"]}
                onChange={(e) => {
                  const value = e.target.value;
                  dispatch(
                    updateProductField({
                      field:
                        label === "MSRP Price"
                          ? "originalPrice"
                          : "discountedPrice",
                      value,
                    })
                  );
                }}
              />
            </div>
          ))}
        </div>
        <div>
          <p className="my-0 pb-1 text-[#797474] text-sm">
            Price <span className="text-red-600">*</span>
          </p>
          <TextField
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
            value={pricing.price}
            onChange={(e) => {
              const value = e.target.value;
              dispatch(
                updateProductField({
                  field: "sellingPrice",
                  value,
                })
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProdPricing;
