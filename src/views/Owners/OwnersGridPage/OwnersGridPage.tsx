import React from "react";
import { Box } from "@mui/material";
import { PageTitle } from "../../../components/PageTitle";
import { OwnersGrid } from "../OwnersGrid/OwnersGrid";

export const OwnersPage = () => {
    return (
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }} >
          <PageTitle title="Propietarios" />
        </Box>
        <OwnersGrid />
      </Box>
    );
}
