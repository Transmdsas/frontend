import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

interface Input {
  label?: string;
  fullWidth?: boolean;
  multiline?: boolean;
  rows?: number;
}

export default function Input({ label, fullWidth, multiline, rows }: Input) {
  return (
    <>
      <TextField
        label={label}
        size={"medium"}
        fullWidth={fullWidth}
        multiline={multiline}
        rows={rows}
        sx={{
          "&.MuiInputBase-root": {
            borderRadius: "50px",
          },
        }}
      />
    </>
  );
}
