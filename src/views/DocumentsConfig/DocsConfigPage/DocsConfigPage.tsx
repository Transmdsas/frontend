import React from "react";
import { Box } from "@mui/material";
import { PageTitle } from "../../../components/PageTitle";
import { DocsConfigGrid } from './../DocsConfigGrid/DocsConfigGrid';

export const DocsConfigPage = () => {

    return (
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }} >
          <PageTitle title="Configuración carga de documentos" />
        </Box>
        <DocsConfigGrid />
      </Box>
    );
}