import React from "react";
import { Box } from "@mui/material";
import { PageTitle } from "../../../components/PageTitle";
// import { useSelector, useDispatch } from "react-redux";
// import { setButtonProps } from "../../../actions/Actions";
import { VehiclesGrid } from "../VehiclesGrid/VehiclesGrid";
import { CommentsContainer } from "../../../components/comments/CommentsContainer"


export const VehiclesPage = () => {
    // useSelector((state:any) => state.buttonProps);
    // const dispatch = useDispatch();
  
    return (
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }} >
          <PageTitle title="Vehiculos" />
        </Box>
        <VehiclesGrid />
        <CommentsContainer/>
      </Box>
      
    );
}
