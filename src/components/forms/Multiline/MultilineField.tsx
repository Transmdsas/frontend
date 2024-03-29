import React from "react";
import { Grid, Box, TextField } from "@mui/material";

interface iMultilineField {
  label?: string | number;
  name?: string;
  rows?: number;
  handleSubmit: Function;
  handleChange: Function;
  size?: number;
  error?: boolean;
  errorMessage?: string;
}

export const MultilineField = ({
  label,
  name,
  rows,
  handleSubmit,
  handleChange,
  size,
  error,
  errorMessage,
}: iMultilineField) => {
  return (
    <Grid item xs={12} md={size}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={(e: any) => handleSubmit(e)}
      >
        <TextField
          label={label}
          name={name}
          multiline={true}
          fullWidth={true}
          rows={rows}
          onChange={(e: any) => handleChange(e)}
          error={error}
          helperText={errorMessage}
          sx={{ "& .MuiInputBase-root": { borderRadius: "30px" } }}
        />
      </Box>
    </Grid>
  );
};
