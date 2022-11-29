import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { PageTitle } from "../../../components/PageTitle";
import { useSelector, useDispatch } from "react-redux";
// import { setButtonProps } from "../../../actions/Actions";
import { OrdersGrid } from "../OrdersGrid/OrdersGrid";

export const OrdersPage = () => {
    // useSelector((state:any) => state.buttonProps);
    // const dispatch = useDispatch();

<<<<<<< HEAD
    useEffect(() => {
      const createButton = {
        title: "Ordenes de cargue",
        url:'crearOrdenCargue'
      }
      dispatch(setButtonProps(createButton))
    }, []);
=======
    // useEffect(() => {
    //   const createButton = {
    //     title: "Crear Orden de cargue",
    //     url:'crearOrdenCargue'
    //   }
    //   dispatch(setButtonProps(createButton))
    // }, []);
>>>>>>> f8d6d481ec724b41cbbc40b7ca82ace68c1665b5
  
    return (
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }} >
          <PageTitle title="Ordenes de cargue" />
        </Box>
        <OrdersGrid />
      </Box>
    );
}
