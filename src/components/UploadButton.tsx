import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import axios from "axios";

interface UploadButton {
  text?: string;
}

const handleUpload = (e: any) => {
  console.log(e.target.files);
  const data = new FormData();
  data.append("file", e.target.files[0]);
  axios.post("lo/assets", data);
};

export default function UploadButtons({ text }: UploadButton) {
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
          onChange={handleUpload}
        />
      </Button>
    </Stack>
  );
}
