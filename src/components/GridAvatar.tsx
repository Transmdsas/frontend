import React from "react";
import { GridCellParams } from "@mui/x-data-grid";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";

interface GridAvatarProps {
  value: string;
}

const GridAvatar = React.memo(function ProgressBar(props: GridAvatarProps) {
  const { value } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <Avatar
        alt="avatar grid image"
        src={value}
        sx={{
          width: 45,
          height: 45,
          boxShadow: 1,
          borderRadius: 100,
        }}
      />
    </React.Fragment>
  );
});

export function renderAvatar(params: GridCellParams) {
  return <GridAvatar value={params.value} />;
}
