import React from "react";
import { Divider, Grid } from "@mui/material";

interface InputDivider {
  size?: number;
  marginTop?: number | string;
  marginBottom?: number | string;
}

export const InputsDivider = ({
  size,
  marginTop,
  marginBottom,
}: InputDivider) => {
  return (
    <Grid item xs={12} sm={size || 12} md={size || 12} >
      <Divider
        variant="fullWidth"
        sx={{ marginBottom: marginBottom || 5, marginTop: marginTop || 5 }}
      />
    </Grid>
  );
};
