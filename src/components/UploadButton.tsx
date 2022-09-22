import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Alert, Grid, Icon } from "@mui/material";
import { FileUpload } from "@mui/icons-material";

interface UploadButton {
  text?: string;
  handleUpload: Function;
  name?: string;
  accepted?: string;
  size?: number;
  icon?: string;
  variant?: string;
  error?: boolean;
  btnColor?: string;
}

export default function UploadButtons({
  text,
  handleUpload,
  name,
  accepted,
  size,
  icon,
  variant,
  error,
  btnColor,
}: UploadButton) {
  return (
    <Grid item xs={12} md={size ? size : 12} alignItems={"center"}>
      <Stack direction="column" alignItems="center" spacing={2}>
        {error && (
          <Stack sx={{ width: 250, marginBottom: 2 }} spacing={2}>
            <Alert variant="outlined" severity="error">
              tiene que subir una documento en este campo
            </Alert>
          </Stack>
        )}
        <Button
          variant={"contained"}
          component="label"
          sx={{
            borderRadius: "50px",
            backgroundColor: btnColor ? btnColor : "#203764",
          }}
          fullWidth={true}
          startIcon={icon ? <Icon children={icon} /> : ""}
        >
          {text}
          <input
            hidden
            accept={accepted ? accepted : "image/*"}
            multiple
            type="file"
            onChange={(e: any) => handleUpload(e)}
            name={name}
          />
        </Button>
      </Stack>
    </Grid>
  );
}
