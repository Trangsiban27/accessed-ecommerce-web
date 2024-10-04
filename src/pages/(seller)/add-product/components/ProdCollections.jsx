import { useState, useEffect } from "react";
import { Box, Checkbox, TextField, Autocomplete } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setProductField } from "../../../../store/slices/productSlice";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function ProdCollections() {
  const dispatch = useDispatch();
  const [productCollections, setProductCollections] = useState([]);
  const selectedCollections = useSelector((state) => state.product.collections);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        // Fetch collections data here, assuming getCollections() returns the data
        // const response_data = await getCollections();
        // console.log("Collections", response_data);
        // Simulate the fetch with a static array for now
        const response_data = [
          { id: 1, name: "Collection 1" },
          { id: 2, name: "Collection 2" },
          { id: 3, name: "Collection 3" },
        ];
        setProductCollections(
          response_data.map((item) => ({
            name: item.name,
            id: String(item.id),
          }))
        );
      } catch (error) {
        console.log(error?.message);
      }
    };
    fetchCollections();
  }, []);

  const handleCollectionsChange = (event, newValue) => {
    dispatch(setProductField({ field: "collections", value: newValue }));
  };

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
        onChange={handleCollectionsChange}
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
