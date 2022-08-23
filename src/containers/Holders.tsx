import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { GridRowsProp, GridColTypeDef } from "@mui/x-data-grid";
import Datagrid from "../components/Datagrid";
import { PageTitle } from "../components/PageTitle";
import { dateFormatter } from "../utils/utils";
import { renderProgress } from "../components/ProgressBar";
import { renderEditButton } from "../components/GridEditButton";
import { PrimaryButton } from "../components/PrimaryButton";

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

const Holders = () => {
  const columns = useMemo(
    () => [
      {
        field: "firstName",
        headerName: "Nombres",
        flex: 0.5,
        ...commonProps,
      },
      {
        field: "lastName",
        headerName: "Apellidos",
        flex: 0.5,
        ...commonProps,
      },
      {
        field: "documentType",
        headerName: "Tipo de documento",
        flex: 0.5,
        ...commonProps,
      },
      {
        field: "documentNumber",
        headerName: "Número de Documento",
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
        field: "balances",
        headerName: "Saldos",
        type: "boolean",
        flex: 0.3,
        ...commonProps,
      },
      {
        field: "advances",
        headerName: "Anticipos",
        type: "boolean",
        flex: 0.3,
        ...commonProps,
      },
      {
        field: "createdAt",
        ...createdAt,
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
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <PageTitle title="Tenedores" />
        <PrimaryButton title="Crear Tenedor" url="crearTenedor" />
      </Box>
      <Datagrid rows={rows} cols={columns} rowId="documentNumber" />
    </Box>
  );
};

export { Holders };
