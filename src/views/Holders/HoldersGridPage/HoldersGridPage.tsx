import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { PageTitle } from "../../../components/PageTitle";
import { HoldersGrid } from "../HoldersGrid/HoldersGrid";

export const HoldersPage = () => {

    return (
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }} >
          <PageTitle title="Tenedores" />
        </Box>
        <HoldersGrid />
      </Box>
    );
}
