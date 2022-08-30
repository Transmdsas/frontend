import React from "react";
import { Grid, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";

interface DropDownParameters {
  label?: string;
  name?: string;
  size?: number;
  dropdownValues?: DropdownValues[];
  value?: any;
  rows?: number;
  handleSubmit: Function;
  handleChange: Function;
}

interface DropdownValues {
  label?: string | number;
  value?: string | number;
}

export const DropdownField = ({
  label,
  name,
  size,
  dropdownValues,
  value = "",
  handleSubmit,
  handleChange,
}: DropDownParameters) => {
  return (
    <Grid item xs={12} md={size}>
      <Box
        component="form"
        autoComplete="off"
        noValidate
        onSubmit={(e: any) => handleSubmit(e)}
      >
        <TextField
          label={label}
          select
          size={"small"}
          name={name}
          value={value}
          fullWidth={true}
          onChange={(e: any) => handleChange(e)}
        >
          {dropdownValues?.map((option: any) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Grid>
  );
};
