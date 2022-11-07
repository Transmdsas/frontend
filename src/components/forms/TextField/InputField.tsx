import React from "react";
import { Box, Grid, TextField } from "@mui/material";
import { useField } from "formik";

export const InputField = (props: any) => {
  const [field, meta] = useField(props);

  return (
    <Grid item xs={12} md={3}>
      <Box
        component="form"
        autoComplete="off"
        //onSubmit={(e: any) => handleSubmit(e)}
        noValidate
      >
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
      </Box>
    </Grid>
  );
};
