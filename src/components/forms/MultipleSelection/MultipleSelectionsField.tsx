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
  disabled?: boolean;
}

interface Chips {
  label?: string | number;
  value?: string | number;
}

export const MultipleSelectionField = ({
  label,
  name,
  size,
  dropdownValues,
  handleMultipleOptions,
  error,
  errorMessage,
  disabled,
}: MultipleSlectionsInp) => {

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
          renderInput={(params) =>
            disabled ? (
              <TextField
                {...params}
                label={label}
                placeholder={label}
                error={error}
                helperText={errorMessage}
                disabled={disabled}
                InputProps={{ readOnly: true }}
              />
            ) : (
              <TextField
                {...params}
                label={label}
                placeholder={label}
                error={error}
                helperText={errorMessage}
              />
            )
          }
          sx={{ width: "100%" }}
        />
      </Box>
    </Grid>
  );
}
