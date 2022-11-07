import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Grid, TextField } from "@mui/material";
import { useField } from "formik";

export const CalendarField = (props: any) => {
  const [field, meta, helpers] = useField(props.name);
  const { setValue } = helpers;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid item xs={4} md={3}>
        <DesktopDatePicker
          inputFormat="DD/MM/YYYY"
          minDate={dayjs(props.minDate)}
          label={props.label}
          maxDate={dayjs(props.maxDate)}
          value={meta.value}
          onChange={(newValue) => setValue(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              variant="outlined"
              sx={{
                marginTop: 1,
                marginBottom: 1,
                "& .MuiInputBase-root": { borderRadius: "20px" },
              }}
              size="small"
              error={meta.touched && Boolean(meta.error)}
              helperText={meta.touched && meta.error}
              {...field}
            />
          )}
        />
      </Grid>
    </LocalizationProvider>
  );
};
