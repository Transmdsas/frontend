import React from "react";
import { Box } from "@mui/material";
import { PageTitle } from "../../../components/PageTitle";
import { useSelector, useDispatch } from "react-redux";
// import { setButtonProps } from "../../../actions/Actions";
import { DriversGrid } from "../DriversGrid/DriversGrid";

export const DriversPage = () => {
    // useSelector((state:any) => state.buttonProps);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //   const createButton = {
    //     title: "Crear Conductor",
    //     url:'crearConductor'
    //   }
    //   dispatch(setButtonProps(createButton))
    // }, []);
  
    return (
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }} >
          <PageTitle title="Conductores" />
        </Box>
        <DriversGrid />
      </Box>
    );
}
