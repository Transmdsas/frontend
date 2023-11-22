import React from "react";
import { Box } from "@mui/material";
import { PageTitle } from "../../../components/PageTitle";
import { ParametersConfigGrid } from './../ParametersConfigGrid/ParametersConfigGrid';

export const ParametersConfigPage = () => {

    return (
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }} >
          <PageTitle title="Parametros y valores" />
        </Box>
        <ParametersConfigGrid />
      </Box>
    );
}