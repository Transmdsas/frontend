import React from "react";
import { Grid, Checkbox, FormControlLabel } from "@mui/material";
import { useField } from "formik";

export const CheckBoxField = (props: any) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  function _onChange(e:any) {
    setValue(e.target.checked);
  }

  return (
    <Grid item xs={4} md={3}>
      <FormControlLabel
        control={
          <Checkbox
            className="check-input"
            {...field}
            onChange={_onChange}
          />
        }
        label={props.label}
        value={field.checked}
        checked={field.checked}
      />
    </Grid>
  );
};
