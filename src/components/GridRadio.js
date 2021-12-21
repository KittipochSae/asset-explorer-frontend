import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function GridRadio({ handleChange, selected }) {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Grid Layer</FormLabel>
      <RadioGroup
        aria-label="grid"
        defaultValue="None"
        name="radio-buttons-group"
        onChange={handleChange}
        value={selected}
      >
        <FormControlLabel value="None" control={<Radio />} label="None" />
        <FormControlLabel
          value="DOL Price"
          control={<Radio />}
          label="DOL Price"
        />
        <FormControlLabel
          value="Market Price"
          control={<Radio />}
          label="Market Price"
        />
        <FormControlLabel
          value="Attraction Score"
          control={<Radio />}
          label="Attraction Score"
        />
        <FormControlLabel
          value="Education Score"
          control={<Radio />}
          label="Education Score"
        />
        <FormControlLabel
          value="Service Score"
          control={<Radio />}
          label="Service Score"
        />
        <FormControlLabel
          value="Transportation Score"
          control={<Radio />}
          label="Transportation Score"
        />
        <FormControlLabel
          value="Environment Score"
          control={<Radio />}
          label="Environment Score"
        />
      </RadioGroup>
    </FormControl>
  );
}
