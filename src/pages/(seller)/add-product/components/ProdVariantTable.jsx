import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableBody,
  Table,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Divider, TextField } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  generateVariantOptionsTable,
  updateAllVariantOptionBaseValues,
  updateVariantOptionField,
} from "../../../../store/slices/variantsSlice";

const ProdVariantTable = () => {
  const dispatch = useDispatch();
  const variants = useSelector((state) => state.variants.variants);
  const primaryVariantType = useSelector(
    (state) => state.variants.primaryVariantType
  );
  const hasVariants = useSelector((state) => state.product.hasVariants);
  const variantOptionsTable = useSelector(
    (state) => state.variants.variantOptionsTable
  );
  const [baseValues, setBaseValues] = useState({
    sellingPrice: null,
    discountedPrice: null,
    quantityAvailable: null,
    originalPrice: null,
    sku: "",
  });

  const handleInputChange = (index, field, value) => {
    dispatch(updateVariantOptionField({ index, field, value }));
  };

  useEffect(() => {
    dispatch(generateVariantOptionsTable());
  }, [dispatch, variants, primaryVariantType]);

  console.log(JSON.stringify(variants, null, 2));

  if (!hasVariants) return <></>;

  return (
    <div className="w-full rounded-lg p-5">
      <p className="font-medium text-lg text-start mb-3">
        Product Variants Table{" "}
        <span className="text-gray-400 font-normal text-[16px]">
          (pricing, quantity)
        </span>
        <span className="text-red-600"> *</span>
      </p>
      <Box className="flex items-center justify-between mb-5">
        <Box>
          <TextField
            label="Price"
            type="number"
            size="small"
            variant="outlined"
            className="max-w-[150px]"
            value={baseValues.sellingPrice}
            onChange={(e) =>
              setBaseValues({ ...baseValues, sellingPrice: e.target.value })
            }
          />
        </Box>
        <Box>
          <TextField
            label="Sale"
            type="number"
            size="small"
            className="max-w-[150px]"
            value={baseValues.discountedPrice}
            onChange={(e) =>
              setBaseValues({ ...baseValues, discountedPrice: e.target.value })
            }
          />
        </Box>
        <Box>
          <TextField
            label="Mrsp"
            type="number"
            size="small"
            className="max-w-[150px]"
            value={baseValues.originalPrice}
            onChange={(e) =>
              setBaseValues({ ...baseValues, originalPrice: e.target.value })
            }
          />
        </Box>
        <Box>
          <TextField
            label="Quantity"
            type="number"
            size="small"
            className="max-w-[150px]"
            value={baseValues.quantityAvailable}
            onChange={(e) =>
              setBaseValues({
                ...baseValues,
                quantityAvailable: e.target.value,
              })
            }
          />
        </Box>
        <Box>
          <TextField
            label="Sku"
            type="text"
            size="small"
            className="max-w-[150px]"
            value={baseValues.sku}
            onChange={(e) =>
              setBaseValues({ ...baseValues, sku: e.target.value })
            }
          />
        </Box>
        <Button
          variant="contained"
          className="bg-[drakGreen] text-white"
          onClick={() => {
            dispatch(updateAllVariantOptionBaseValues(baseValues));
          }}
        >
          Apply all
        </Button>
      </Box>
      <Divider className="my-5" />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow className="border-2 border-solid border-gray-200">
              <StyledTableCell className="uppercase" align="center">
                #
              </StyledTableCell>
              {variants.map((item, index) => (
                <StyledTableCell
                  className="uppercase"
                  align="center"
                  key={index}
                >
                  {item.type}
                </StyledTableCell>
              ))}
              <StyledTableCell className="uppercase" align="center">
                Price
              </StyledTableCell>
              <StyledTableCell className="uppercase" align="center">
                Mrsp Price
              </StyledTableCell>
              <StyledTableCell className="uppercase" align="center">
                Sale Price
              </StyledTableCell>
              <StyledTableCell className="uppercase" align="center">
                Quantity
              </StyledTableCell>
              <StyledTableCell className="uppercase" align="center">
                Sku
              </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {variantOptionsTable.map((combination, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                {variants.map((variant, idx) => (
                  <StyledTableCell key={idx} align="center">
                    <p className="capitalize text-start pl-2">
                      {combination[variant.type]}
                    </p>
                  </StyledTableCell>
                ))}
                <StyledTableCell align="center">
                  <TextField
                    id={`price-${index}`}
                    label="Price"
                    type="number"
                    size="small"
                    className="max-w-[150px]"
                    value={
                      combination.sellingPrice === 0
                        ? null
                        : combination.sellingPrice
                    }
                    onChange={(e) =>
                      handleInputChange(index, "sellingPrice", e.target.value)
                    }
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <TextField
                    id={`mrspPrice-${index}`}
                    label="Mrsp Price"
                    type="number"
                    size="small"
                    className="max-w-[150px]"
                    value={
                      combination.originalPrice === 0
                        ? null
                        : combination.originalPrice
                    }
                    onChange={(e) =>
                      handleInputChange(index, "originalPrice", e.target.value)
                    }
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <TextField
                    id={`salePrice-${index}`}
                    label="Sale Price"
                    type="number"
                    size="small"
                    className="max-w-[150px]"
                    value={
                      combination.discountedPrice === 0
                        ? null
                        : combination.discountedPrice
                    }
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "discountedPrice",
                        e.target.value
                      )
                    }
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <TextField
                    id={`quantity-${index}`}
                    label="Quantity"
                    type="number"
                    size="small"
                    className="max-w-[150px]"
                    value={
                      combination.quantityAvailable === 0
                        ? null
                        : combination.quantityAvailable
                    }
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "quantityAvailable",
                        e.target.value
                      )
                    }
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <TextField
                    id={`sku-${index}`}
                    label="sku"
                    type="text"
                    size="small"
                    className="max-w-[150px]"
                    value={combination.sku}
                    onChange={(e) =>
                      handleInputChange(index, "sku", e.target.value)
                    }
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
    fontWeight: "semibold",
    color: "gray",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default ProdVariantTable;
