import React from "react";
import { Box, Button, Grid } from "@mui/material";
import { PageTitle } from "../../components/PageTitle";
import  TwoImageCard from "../../components/Cards/TwoImageCard";
import { CommentsContainer } from "../../components/comments/CommentsContainer";
import ImagenCard from "../../components/Cards/ImagenCard";
import { CardPageTitle } from "../../components/Cards/CardPageTitle";




export const VehiclesDashboard = () => {
    // useSelector((state:any) => state.buttonProps);
    // const dispatch = useDispatch();
  
    return (
      
      <Box>
        <PageTitle title="Dashboard Del Vehiculo" />
        <Grid sx={{ display: "flex", justifyContent: "" }} >
          
        </Grid>
        <TwoImageCard/>
        <Grid sx={{ display: "Center", justifyContent: "space-between" }} >
        <ImagenCard/>
        <ImagenCard/>
        <ImagenCard/>
        <ImagenCard/>
        </Grid>
        
        <CommentsContainer/>
      </Box>
      
    );
}
