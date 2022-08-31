import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

interface UploadButton {
  text?: string;
  handleUpload: Function;
}

export default function UploadButtons({ text, handleUpload }: UploadButton) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Button
        variant="contained"
        component="label"
        sx={{ borderRadius: "50px" }}
      >
        {text}
        <input
          hidden
          accept="image/*"
          multiple
          type="file"
          onChange={(e: any) => handleUpload(e)}
        />
      </Button>
    </Stack>
  );
}
