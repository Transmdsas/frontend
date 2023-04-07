import React from "react";
import { Box } from "@mui/material";
import { PageTitle } from "../../../components/PageTitle";
//import { useSelector, useDispatch } from "react-redux";
//import { setButtonProps } from "../../../actions/Actions";
import { OwnersGrid } from "../OwnersGrid/OwnersGrid";

export const OwnersPage = () => {
    // useSelector((state:any) => state.buttonProps);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //   const createButton = {
    //     title: "Crear Propietario",
    //     url:'crearPropietario'
    //   }
    //   dispatch(setButtonProps(createButton))
    // }, []);
  
    return (
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }} >
          <PageTitle title="Propietarios" />
        </Box>
        <OwnersGrid />
      </Box>
    );
}
