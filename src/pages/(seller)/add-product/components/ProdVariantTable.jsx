import { useState } from "react";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableBody,
  Table,
  Box,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

const ProdVariantTable = () => {
  const { control, watch, setValue } = useFormContext();
  const variants = watch("variants");
  const { fields: variantOptionsTable } = useFieldArray({
    control,
    name: "variantOptionsTable",
  });

  const [baseValues, setBaseValues] = useState({
    sellingPrice: "",
    discountedPrice: "",
    quantityAvailable: "",
    originalPrice: "",
    sku: "",
  });

  const updateAllVariantOptionBaseValues = () => {
    variantOptionsTable.forEach((_, index) => {
      Object.entries(baseValues).forEach(([key, value]) => {
        if (value !== "") {
          setValue(`variantOptionsTable.${index}.${key}`, value);
        }
      });
    });
  };

  if (variantOptionsTable?.length === 0) return null;

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
          onClick={updateAllVariantOptionBaseValues}
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
              <StyledTableRow key={combination.id}>
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                {variants.map((variant, idx) => (
                  <StyledTableCell key={idx} align="center">
                    <p className="capitalize text-start pl-2">
                      {combination[variant.type]}
                    </p>
                  </StyledTableCell>
                ))}
                <StyledTableCell align="center">
                  <Controller
                    name={`variantOptionsTable.${index}.sellingPrice`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Price"
                        type="number"
                        size="small"
                        className="max-w-[150px]"
                        value={field.value === 0 ? "" : field.value}
                        // onChange={(e) => field.onChange(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Controller
                    name={`variantOptionsTable.${index}.originalPrice`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Mrsp Price"
                        type="number"
                        size="small"
                        className="max-w-[150px]"
                        value={field.value === 0 ? "" : field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Controller
                    name={`variantOptionsTable.${index}.discountedPrice`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Sale Price"
                        type="number"
                        size="small"
                        className="max-w-[150px]"
                        value={field.value === 0 ? "" : field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Controller
                    name={`variantOptionsTable.${index}.quantityAvailable`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Quantity"
                        type="number"
                        size="small"
                        className="max-w-[150px]"
                        value={field.value === 0 ? "" : field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Controller
                    name={`variantOptionsTable.${index}.sku`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="sku"
                        type="text"
                        size="small"
                        className="max-w-[150px]"
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
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
