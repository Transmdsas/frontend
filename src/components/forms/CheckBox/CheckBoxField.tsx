import React from "react";
import { Grid, Checkbox, FormControlLabel } from "@mui/material";
import { useField } from "formik";

interface CheckboxFieldProps {
  name: string;
  label: string;
}


export const CheckBoxField: React.FC<CheckboxFieldProps> = ({
  name,
  label,
  ...props
}) => {
  const [field, meta] = useField({
    name,
    type: 'checkbox'
  });

  function _onChange(event:any) {
    const { checked } = event.target;
    field.onChange({
      target: {
        name: field.name,
        value: checked,
      },
    });
    //setValue(e.target.checked);
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <FormControlLabel
        control={
          <Checkbox
            className="check-input"
            {...field}
            {...props}
            onChange={_onChange}
            checked={field.value}
          />
        }
        label={label}
      />
    </Grid>
  );
};
