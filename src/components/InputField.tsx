import React from "react";
import { Box, Grid, TextField } from "@mui/material";
import { useEffect } from "react";
import { ImportsNotUsedAsValues } from "typescript";
interface Inputs {
  label?: string | number;
  name?: string;
  handleSubmit: Function;
  handleChange: Function;
  size?: number;
  error?: boolean;
  errorMessage?: any;
}

export const InputField = ({
  label,
  name,
  handleSubmit,
  handleChange,
  size,
  error,
  errorMessage,
}: Inputs) => {
  return (
    <Grid item xs={12} md={size}>
      <Box
        component="form"
        autoComplete="off"
        onSubmit={(e: any) => handleSubmit(e)}
        noValidate
      >
        <TextField
          className="transmd__input"
          label={label}
          error={error}
          size={"small"}
          required={true}
          name={name}
          fullWidth={true}
          onChange={(e: any) => handleChange(e)}
          helperText={errorMessage}
          sx={{ "& .MuiInputBase-root": { borderRadius: "30px" } }}
        />
      </Box>
    </Grid>
  );
};
