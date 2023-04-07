import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { PageTitle } from "../../../components/PageTitle";
import { CustomersGrid } from "../CustomersGrid/CustomersGrid";

export const CustomersPage = () => {
    // useSelector((state:any) => state.buttonProps);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //   const createButton = {
    //     title: "Crear Orden de cargue",
    //     url:'crearOrdenCargue'
    //   }
    //   dispatch(setButtonProps(createButton))
    // }, []);
  
    return (
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }} >
          <PageTitle title="Clientes" /> 
        </Box>
        <CustomersGrid />
      </Box>
      
    );
}
