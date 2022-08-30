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
    <Grid item xs={12} md={size}>
      <Divider
        variant="fullWidth"
        sx={{ marginBottom: marginBottom, marginTop: marginTop }}
      />
    </Grid>
  );
};
