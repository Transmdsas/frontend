import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { PageTitle } from "../../../components/PageTitle";
import { useSelector, useDispatch } from "react-redux";
import { setButtonProps } from "../../../actions/Actions";
import { OrdersGrid } from "../OrdersGrid/OrdersGrid";

export const OrdersPage = () => {
    useSelector((state:any) => state.buttonProps);
    const dispatch = useDispatch();

    useEffect(() => {
      const createButton = {
        title: "Crear Orden de cargue",
        url:'crearOrdenCargue'
      }
      dispatch(setButtonProps(createButton))
    }, []);
  
    return (
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }} >
          <PageTitle title="Ordenes de cargue" />
        </Box>
        <OrdersGrid />
      </Box>
    );
}
