import { GridRowsProp, GridColTypeDef } from "@mui/x-data-grid";
import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import { PageTitle } from "../components/PageTitle";
import { renderProgress } from "../components/ProgressBar";
import Datagrid from "../components/Datagrid";
import { dateFormatter } from "./../utils/utils";


const rows: GridRowsProp = [
  {
    id: 1,
    description: "Marcas de vehículos",
    createdAt: "2022-08-18T00:59:52.963Z",
    updatedAt: "2022-08-18T00:59:52.964Z",
    status: .8
  },
  {
    id: 2,
    description: "Tipos de vehículos",
    createdAt: "2022-08-18T03:55:00.272Z",
    updatedAt: "2022-08-18T03:55:00.273Z",
    status: .1
  },
  {
    id: 3,
    description: "Línea de vehículos",
    createdAt: "2022-08-18T03:55:08.729Z",
    updatedAt: "2022-08-18T03:55:08.729Z",
    status: .5
  },
];

const createdAt: GridColTypeDef = {
    headerName: "Fecha creación",
    type: 'date',
    flex: 1,
    valueGetter: ({ value }) => dateFormatter.format(new Date(value)),
  };


  const updatedAt: GridColTypeDef = {
    headerName: "Fecha Actualización",
    type: 'date',
    flex: 1,
    valueGetter: ({ value }) => dateFormatter.format(new Date(value)),
  };


const Parameters = () => {
  const columns = useMemo(
    () => [
      {
        field: "id",
        headerName: "Id",
        flex: 0.3,
      },
      {
        field: "description",
        headerName: "Descripción",
        flex: 1,
      },
      {
        field: "createdAt",
        ...createdAt
      },
      {
        field: "updatedAt",
        ...updatedAt
      },
      {
        field: "status",
        headerName: "Estado Documentación",
        flex: 0.7,
        renderCell: renderProgress

      }
    ],
    []
  );

  return (
    <Box>
      <PageTitle title="Parametros" />
      <Datagrid rows={rows} cols={columns} rowId="id" />
    </Box>
  );
};

export default Parameters;
