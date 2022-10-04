import React, { useEffect, useMemo } from "react";
import { Box } from "@mui/material";
import { GridRowsProp, GridColTypeDef } from "@mui/x-data-grid";
import Datagrid from "../components/Datagrid";
import { PageTitle } from "../components/PageTitle";
import { dateFormatter } from "../utils/utils";
import { renderProgress } from "../components/ProgressBar";
import { renderEditButton } from "../components/GridEditButton";
import { useDispatch, useSelector } from "react-redux";
import { setButtonProps } from "../actions/Actions";

const commonProps: GridColTypeDef = {
  align: "center",
  headerAlign: "center",
};

const createdAt: GridColTypeDef = {
  headerName: "Fecha de creación",
  flex: 0.7,
  type: "date",
  valueGetter: ({ value }) => dateFormatter.format(new Date(value)),
  ...commonProps,
};

const rows: GridRowsProp = [
  {
    avatar:
      "https://image.shutterstock.com/image-photo/young-man-asian-smiling-looking-600w-1848509833.jpg",
    firstName: "Michael",
    lastName: "Espinosa",
    documentType: "CC",
    documentNumber: "123456789",
    associatedCar: "ABC123",
    balances: true,
    advances: false,
    createdAt: "2025-08-18T03:58:26.305Z",
    status: 0.4,
  },
];

const LoadOrders = () => {

    
  const buttonProps = useSelector((state:any) => state.buttonProps);
  const dispatch = useDispatch();
  console.log(buttonProps);
  

  useEffect(() => {
    const createButton = {
      title: "Crear Orden",
      url:'crearOrdenCargue'
    }

    dispatch(setButtonProps(createButton))
  }, []);

  const columns = useMemo(
    () => [
      {
        field: "firstName",
        headerName: "Nombre Del Propietario",
        flex: 0.5,
        ...commonProps,
      },
      {
        field: "associatedCar",
        headerName: "Placa del vehículo",
        flex: 0.5,
        ...commonProps,
      },
      {
        field: "createdAt",
        ...createdAt,
      },
      {
        field: "balances",
        headerName: "Saldos",
        type: "boolean",
        flex: 0.3,
        ...commonProps
      },
      {
        field: "advances",
        headerName: "Anticipos",
        type: "boolean",
        flex: 0.3,
        ...commonProps
      },

      {
        field: "status",
        headerName: "Cumplimiento Documentación",
        flex: 0.4,
        align: "center",
        renderCell: renderProgress,
        ...commonProps,
      },
      {
        field: "actions",
        headerName: "",
        type: "actions",
        flex: 0.1,
        renderCell: renderEditButton,
        ...commonProps,
      },
    ],
    []
  );

  return (
    <Box>
      <Box sx={{ display: "flex-end", justifyTracks: "space-between" }} >
        <PageTitle title="Ordenes De Cargue" />
      </Box>
      <Datagrid rows={rows} cols={columns} rowId="documentNumber" />
    </Box>
  );
};

export { LoadOrders };
