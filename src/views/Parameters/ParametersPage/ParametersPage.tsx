import React from "react";
import { Box } from "@mui/material";
import { PageTitle } from "../../../components/PageTitle";
import { ParametersGrid } from './../ParametersGrid/ParametersGrid';

export const ParametersPage = () => {

    return (
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }} >
          <PageTitle title="Configuración creación de parametro" />
        </Box>
        <ParametersGrid />
      </Box>
    );
}