import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Grid, Icon } from "@mui/material";
import { FileUpload } from "@mui/icons-material";

interface UploadButton {
  text?: string;
  handleUpload: Function;
  name?: string;
  accepted?: string;
  size?: number;
  icon?: string;
  variant?: string;
}

export default function UploadButtons({
  text,
  handleUpload,
  name,
  accepted,
  size,
  icon,
  variant,
}: UploadButton) {
  return (
    <Grid item xs={6} md={size ? size : 9} alignItems={"center"}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button
          variant={"contained"}
          component="label"
          sx={{ borderRadius: "50px" }}
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
