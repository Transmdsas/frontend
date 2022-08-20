import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

export default function ImageAvatars({ imagename, image }: any) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={imagename} src={image} />
    </Stack>
  );
}
