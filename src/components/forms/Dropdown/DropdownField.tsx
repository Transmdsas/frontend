import React from "react";
import {
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@mui/material";
import { useField } from "formik";

export const DropdownField = (props: any) => {
  const [field, meta] = useField(props);
  return (
    <Grid item xs={12} sm={6} md={props.md || 4} lg={props.lg || 3}>
        <FormControl
          fullWidth
          error={meta.touched && Boolean(meta.error)}
          size="small"
          sx={{
            marginTop: 1,
            marginBottom: 1,
            "& .MuiInputBase-root": { borderRadius: "20px" },
          }}
        >
          <InputLabel id={props.label}>{props.label}</InputLabel>
          <Select
            className="select-input"
            labelId={props.label}
            defaultValue=""
            {...field}
            {...props}
          >
            {props.data?.map((item: any) => (
              <MenuItem key={item.label} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
          {meta.touched && meta.error && (
            <FormHelperText>{meta.error}</FormHelperText>
          )}
        </FormControl>
    </Grid>
  );
};
