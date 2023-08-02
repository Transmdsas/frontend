import React from "react";
import { Box } from "@mui/material";
import { PageTitle } from "../../../components/PageTitle";
import { VehiclesGrid } from "../VehiclesGrid/VehiclesGrid";



export const VehiclesPage = () => {
    return (
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }} >
          <PageTitle title="Vehiculos" />
        </Box>
        <VehiclesGrid />
      </Box>
    );
}
