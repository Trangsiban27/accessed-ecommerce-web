import { FormControl, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import StarIcon from "@mui/icons-material/Star";

const SortRating = () => {
  const [age, setAge] = useState("Read all");
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
        <MenuItem value="Read all">
          <em>Read all</em>
        </MenuItem>
        <MenuItem value={1}>
          <StarIcon fontSize="10"></StarIcon>
        </MenuItem>
        <MenuItem value={2}>
          {[...Array(2)].map((_, index) => (
            <StarIcon key={index} fontSize="10" />
          ))}
        </MenuItem>
        <MenuItem value={3}>
          {[...Array(3)].map((_, index) => (
            <StarIcon key={index} fontSize="10" />
          ))}
        </MenuItem>
        <MenuItem value={4}>
          {[...Array(4)].map((_, index) => (
            <StarIcon key={index} fontSize="10" />
          ))}
        </MenuItem>
        <MenuItem value={5}>
          {[...Array(5)].map((_, index) => (
            <StarIcon key={index} fontSize="10" />
          ))}
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortRating;
