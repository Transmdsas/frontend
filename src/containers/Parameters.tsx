import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { GridRowsProp, GridColTypeDef } from "@mui/x-data-grid";
import { PageTitle } from "../components/PageTitle";
import { renderEditButton } from "../components/GridEditButton";
import Datagrid from "../components/Datagrid";
import { dateFormatter } from "./../utils/utils";
import { setButtonProps } from "../actions/Actions";

const rows: GridRowsProp = [
  {
    id: 1,
    description: "Marcas de vehículos",
    createdAt: "2022-08-18T00:59:52.963Z",
    updatedAt: "2022-08-18T00:59:52.964Z",
    status: 0.8,
  },
  {
    id: 2,
    description: "Tipos de vehículos",
    createdAt: "2022-08-18T03:55:00.272Z",
    updatedAt: "2022-08-18T03:55:00.273Z",
    status: 0.1,
  },
  {
    id: 3,
    description: "Línea de vehículos",
    createdAt: "2022-08-18T03:55:08.729Z",
    updatedAt: "2022-08-18T03:55:08.729Z",
    status: 0.5,
  },
];

const commonProps: GridColTypeDef = {
  align: "center",
  headerAlign: "center",
};

const createdAt: GridColTypeDef = {
  headerName: "Fecha creación",
  type: "date",
  flex: 1,
  valueGetter: ({ value }) => dateFormatter.format(new Date(value)),
  ...commonProps
};

const updatedAt: GridColTypeDef = {
  headerName: "Fecha Actualización",
  type: "date",
  flex: 1,
  valueGetter: ({ value }) => dateFormatter.format(new Date(value)),
  ...commonProps
};

const Parameters = () => {
  useSelector((state: any) => state.buttonProps);
  const dispatch = useDispatch();

  useEffect(() => {
    const createButton = {
      title: "Crear Parametro",
      url: "crearParametro",
    };
    dispatch(setButtonProps(createButton));
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        field: "id",
        headerName: "Id",
        flex: 0.3,
        ...commonProps
      },
      {
        field: "description",
        headerName: "Descripción",
        flex: 1,
        ...commonProps
      },
      {
        field: "createdAt",
        ...createdAt,
      },
      {
        field: "updatedAt",
        ...updatedAt,
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
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <PageTitle title="Parametros" />
      </Box>
      <Datagrid rows={rows} cols={columns} rowId="id" />
    </Box>
  );
};

export { Parameters };
