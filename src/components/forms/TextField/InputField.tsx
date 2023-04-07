import React from "react";
import { Grid, TextField } from "@mui/material";
import { useField } from "formik";

export const InputField = (props: any) => {
  const [field, meta] = useField(props);

  return (
    <Grid item xs={12} sm={6} md={props.md || 4} lg={props.lg || 3}>
        <TextField
          className="text-input"
          fullWidth
          variant="outlined"
          error={meta.touched && Boolean(meta.error)}
          helperText={meta.touched && meta.error}
          size="small"
          sx={{
            marginTop: 1,
            marginBottom: 1,
            "& .MuiInputBase-root": { borderRadius: "20px" },
          }}
          {...field}
          {...props}
        />
    </Grid>
  );
};
