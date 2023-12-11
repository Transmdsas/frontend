import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { Grid } from "@mui/material";
import { useField } from "formik";

export const CalendarField = (props: any) => {
  const [field, meta, helpers] = useField(props.name);
  const { setValue } = helpers;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <Grid item xs={12} sm={6} md={props.md || 4} lg={props.lg || 3}>
        <DesktopDatePicker
          format="DD/MM/YYYY"
          minDate={dayjs(props.minDate)}
          label={props.label}
          maxDate={
            props.maxDate
              ? dayjs(props.maxDate)
              : dayjs(new Date()).add(10, "year")
          }
          value={dayjs(meta.value)}
          onChange={(newValue) => {
            setValue(dayjs(newValue));
          }}
          sx={{
            marginTop: 1,
            marginBottom: 1,
            "& .MuiInputBase-root": { borderRadius: "20px" },
          }}
          slotProps={{
            textField: {
              variant: "outlined",
              size: "small",
              fullWidth: true,
              error: meta.touched && Boolean(meta.error),
              helperText: (meta.touched && meta.error),
            },
          }}
        />
      </Grid>
    </LocalizationProvider>
  );
};
