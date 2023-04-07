import * as React from "react";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";

export const BadgeNotification = () => {
  return (
    <Stack
      spacing={4}
      direction="row"
      sx={{ color: "action.active", paddingRight: "30px", paddingTop: "13px" }}
    >
      <Badge color="error" badgeContent={1}>
        <NotificationsIcon />
      </Badge>
    </Stack>
  );
}
