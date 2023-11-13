import React from "react";
import { GridCellParams } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import config from './../config';

interface GridAvatarProps {
  value: string;
  altValue?: String;
}

const GridAvatar = React.memo(function GridAvatar(props: GridAvatarProps) {
  const { value, altValue } = props;
  console.log(`${config.server_url}${value}`);
  return (
    <Avatar
      alt={`Avatar de ${altValue}`}
      src={value}
      sx={{
        width: 45,
        height: 45,
        boxShadow: 1,
        borderRadius: 100,
      }}
    />
  );
});

export function renderAvatar(params: GridCellParams) {
  return <GridAvatar value={params.value as string} altValue={params.row.altValue as string} />;
}
