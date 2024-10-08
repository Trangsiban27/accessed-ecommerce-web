import { useState, useEffect } from "react";
import { Box, Checkbox, TextField, Autocomplete } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCollections } from "../../../../servicea/collectionsService";
import { updateProductField } from "../../../../servicea/productService";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function ProdCollections() {
  const dispatch = useDispatch();
  const selectedCollections = useSelector((state) => state.product.collections);
  const [productCollections, setProductCollections] = useState([]);

  useEffect(() => {
    const collections = getCollections();
    setProductCollections(collections);
  }, []);

  return (
    <Box className="mt-2">
      <p className="my-0 mb-1 text-[#212020] text-sm text-start">
        Collections <span className="text-red-600"> *</span>
      </p>
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={productCollections}
        size="small"
        className="w-full min-h-[40px] mb-1"
        disableCloseOnSelect
        value={selectedCollections}
        onChange={(event, newValue) => {
          updateProductField(dispatch, "collections", newValue);
        }}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.name}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              "aria-label": "Without label",
            }}
          />
        )}
      />
    </Box>
  );
}

export default ProdCollections;
