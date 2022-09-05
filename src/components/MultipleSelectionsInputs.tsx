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
  rows?: number;
  handleMultipleOptions: Function;
  error?: boolean;
  errorMessage?: any;
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
  handleMultipleOptions,
  error,
  errorMessage,
}: MultipleSlectionsInp) {
  return (
    <Grid item xs={12} md={size}>
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
              helperText={errorMessage}
              disabled={true}
            />
          )}
          sx={{ width: "100%" }}
        />
      </Box>
    </Grid>
  );
}
