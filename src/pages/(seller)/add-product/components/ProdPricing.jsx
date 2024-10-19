import { useDispatch, useSelector } from "react-redux";
import { TextField, InputAdornment, Box } from "@mui/material";
import { setProductField } from "../../../../store/slices/productSlice";

const ProdPricing = () => {
  const dispatch = useDispatch();
  const pricing = useSelector((state) => ({
    originalPrice: state.product.originalPrice,
    discountedPrice: state.product.discountedPrice,
    sellingPrice: state.product.sellingPrice,
  }));

  const hasVariants = useSelector((state) => state.product.hasVariants);
  if (hasVariants) return <></>;

  return (
    <div className="w-full rounded-lg mb-2 p-3">
      <p className="font-medium text-lg text-start">
        Pricing <span className="text-red-600">*</span>
      </p>
      <div className="border-[2px] border-solid mt-3 border-gray-200 shadow-sm rounded-lg p-5 h-full flex flex-col gap-3">
        <div className="w-full flex items-center justify-between gap-5 mb-2">
          {["Mrsp Price", "Sale Price"].map((label) => (
            <div key={label} className="w-full">
              <p className="my-0 pb-1 text-[#212020] text-sm text-start">
                {label}
                {label === "originalPrice" && (
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
                value={
                  label === "originalPrice"
                    ? pricing.originalPrice
                    : pricing.discountedPrice
                }
                onChange={(e) => {
                  const value = e.target.value;
                  dispatch(
                    setProductField({
                      field:
                        label === "originalPrice"
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
          <p className="my-0 pb-1 text-[#212020] text-sm text-start">
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
            value={pricing.sellingPrice}
            onChange={(e) => {
              const value = e.target.value;
              dispatch(
                setProductField({
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
