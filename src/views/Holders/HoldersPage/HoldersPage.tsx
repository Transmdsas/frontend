import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { PageTitle } from "../../../components/PageTitle";
import { useSelector, useDispatch } from "react-redux";
import { setButtonProps } from "../../../actions/Actions";
import { HoldersGrid } from "../HoldersGrid/HoldersGrid";

export const HoldersPage = () => {
    useSelector((state:any) => state.buttonProps);
    const dispatch = useDispatch();

    useEffect(() => {
      const createButton = {
        title: "Crear Tenedor",
        url:'crearTenedor'
      }
      dispatch(setButtonProps(createButton))
    }, []);
  
    return (
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }} >
          <PageTitle title="Tenedores" />
        </Box>
        <HoldersGrid />
      </Box>
    );
}
