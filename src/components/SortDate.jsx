import { FormControl, MenuItem, Select } from "@mui/material";
import { useState } from "react";

const SortDate = () => {
  const [age, setAge] = useState("ASC");
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <FormControl sx={{ m: 1, minWidth: 120, margin: "0" }} fullWidth>
      <Select
        labelId="demo-controlled-open-select-label"
        id="demo-controlled-open-select"
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={age}
        onChange={handleChange}
        size="small"
        fontSize="5"
      >
        <MenuItem value="ASC">
          <em>Accending</em>
        </MenuItem>
        <MenuItem value="DESC">Descending</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortDate;
