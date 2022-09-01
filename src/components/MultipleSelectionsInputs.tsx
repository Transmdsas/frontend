import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";

interface MultipleSlectionsInp {
  label?: string;
  name?: string;
  size?: number;
  dropdownValues: Chips[];
  value?: any;
  rows?: number;
  handleSubmit: Function;
  handleChange: Function;
  handleMultipleOptions: Function;
  error?: boolean;
  helperText?: boolean;
}

interface Chips {
  label?: string | number;
  value?: string | number;
}

export default function MultipleSelectionsInputs({
  label,
  name,
  size,
  dropdownValues,
  value,
  handleMultipleOptions,
  rows,
  handleSubmit,
  handleChange,
  error,
  helperText,
}: MultipleSlectionsInp) {
  return (
    <Grid item xs={12} md={6}>
      <Box component="form" autoComplete="off" noValidate>
        <Autocomplete
          multiple
          limitTags={3}
          options={dropdownValues}
          getOptionLabel={(option: any) => option.label}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          onChange={(e, value) => handleMultipleOptions(value, name)}
          size="small"
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              placeholder={label}
              error={error}
            />
          )}
          sx={{ width: "100%" }}
        />
      </Box>
    </Grid>
  );
}
