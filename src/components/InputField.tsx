import React from "react";
import { Box, Grid, TextField } from "@mui/material";
interface Inputs {
  label?: string | number;
  name?: string;
  handleSubmit: Function;
  handleChange: Function;
  size?: number;
}

export const InputField = ({
  label,
  name,
  handleSubmit,
  handleChange,
  size,
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
          label={label}
          size={"small"}
          required={true}
          name={name}
          fullWidth={true}
          onChange={(e: any) => handleChange(e)}
        />
      </Box>
    </Grid>
  );
};
