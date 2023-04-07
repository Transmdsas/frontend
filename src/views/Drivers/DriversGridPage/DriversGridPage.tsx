import React from "react";
import { Box } from "@mui/material";
import { PageTitle } from "../../../components/PageTitle";
import { DriversGrid } from "../DriversGrid/DriversGrid";

export const DriversPage = () => {
    return (
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }} >
          <PageTitle title="Conductores" />
        </Box>
        <DriversGrid />
      </Box>
    );
}
