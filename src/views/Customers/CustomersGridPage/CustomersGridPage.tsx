import React from "react";
import { Box } from "@mui/material";
import { PageTitle } from "../../../components/PageTitle";
import { CustomersGrid } from "../CustomersGrid/CustomersGrid";

export const CustomersPage = () => {
    return (
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }} >
          <PageTitle title="Clientes" />
        </Box>
        <CustomersGrid />
      </Box>
    );
}