import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  Checkbox,
  TextField,
  Autocomplete,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { getBrandNames } from "../../../../services/brandNameService";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { getCollections } from "../../../../services/collectionsService";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ProdBranchFeature = () => {
  const { control } = useFormContext();
  const [brandNames, setBrandNames] = useState([]);
  const [productCollections, setProductCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      const collections = await getCollections();
      setProductCollections(collections);
    };
    fetchCollections();
  }, []);

  useEffect(() => {
    const fetchBrandNames = async () => {
      const response = await getBrandNames();
      const parsedBrandNames = response.data.map((item) => item.name);
      setBrandNames(parsedBrandNames);
    };

    fetchBrandNames();
  }, []);

  return (
    <div className="w-full rounded-lg mb-2 p-3">
      <p className="font-medium text-lg text-start">Brand and Collections</p>
      <div className="border-[2px] border-solid mt-3 border-gray-200 shadow-sm rounded-lg p-5 h-full flex flex-col gap-3">
        <div>
          <p className="my-0 mb-1 text-[#212020] text-sm text-start">
            Product brand
            <span className="text-red-600"> *</span>
          </p>
          <FormControl className="w-full">
            <Controller
              name="brandName"
              control={control}
              rules={{ required: "Brand name is required" }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Select
                    {...field}
                    id="demo-multiple-chip"
                    input={<OutlinedInput id="select-multiple-chip" />}
                    className="h-[40px] w-full cursor-pointer"
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        <span className="text-sm font-medium">{selected}</span>
                      </Box>
                    )}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 48 * 4.5 + 8,
                          width: 250,
                        },
                      },
                    }}
                    displayEmpty
                  >
                    {brandNames.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                  {error && (
                    <span className="text-red-600">{error.message}</span>
                  )}
                </>
              )}
            />
          </FormControl>
        </div>

        <Box className="mt-2">
          <p className="my-0 mb-1 text-[#212020] text-sm text-start">
            Collections <span className="text-red-600"> *</span>
          </p>
          <Controller
            name="collections"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={productCollections}
                size="small"
                className="w-full min-h-[40px] mb-1"
                disableCloseOnSelect
                value={value || []}
                onChange={(event, newValue) => {
                  onChange(newValue);
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
                    error={!!error}
                    helperText={error?.message}
                    InputProps={{
                      ...params.InputProps,
                      "aria-label": "Without label",
                    }}
                  />
                )}
              />
            )}
          />
        </Box>

        <div className="flex items-center justify-start gap-3 w-1/2">
          <label>
            <span
              aria-label="hasVariants"
              className="cursor-pointer font-medium"
            >
              Have variants?
            </span>
          </label>
          <Controller
            name="hasVariants"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Switch
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
                id="hasVariants"
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ProdBranchFeature;
