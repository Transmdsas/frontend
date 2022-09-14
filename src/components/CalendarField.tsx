import * as React from "react";
// import { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Stack } from "@mui/system";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Grid } from "@mui/material";

interface Calendar {
  label?: string;
  name?: string;
  size?: number;
  error?: boolean;
  errorMessage?: any;
  disabled?: boolean;
  handleChange: Function;
}

export default function CalendarField({
  error,
  errorMessage,
  handleChange,
  label,
  size,
}: Calendar) {
  const [value, setValue] = React.useState(null);
  console.log(value);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid item md={size}>
        <DesktopDatePicker
          label={label}
          value={value}
          minDate={dayjs("2017-01-01")}
          onChange={(e: any) => handleChange(e)}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              helperText={errorMessage}
              error={error}
              fullWidth={true}
            />
          )}
        />
      </Grid>
    </LocalizationProvider>
  );
}
