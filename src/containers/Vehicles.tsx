import React from "react";
import Box from "@mui/material/Box";
import { GridRowsProp, GridColDef } from "@mui/x-data-grid";
import Datagrid from "../components/Datagrid";
import { Avatar } from "@mui/material";
import { PageTitle } from "../components/PageTitle";
//import { renderProgress } from "../components/ProgressBar";

const rows: GridRowsProp = [
  {
    id: "ABC123",
    carPlate: "ABC123",
    brandId: 2,
    vehicleTypeId: 3,
    lineId: 2,
    bodyWorkId: 3,
    color: "azul",
    modelYear: 2015,
    serialNumber: "asdasdasd123",
    netWeight: 2000,
    emptyWeight: 1000,
    repoweredTo: 2018,
    axles: 2,
    propertyCard: "asdaeeer4545",
    fuelTypeId: 2,
    observations: "N/A",
    frontPhoto: "https://image.shutterstock.com/image-photo/hoofddorpmarch-14-2020-mercedes-started-600w-1708023739.jpg",
    backPhoto: "http://localhost:3000/api/v1/products",
    createdAt: "2022-08-18T03:58:26.305Z",
    updatedAt: "2022-08-18T03:58:26.305Z",
    driver: "Daniel Gonzalez",
    soatDueDate: "2022-08-18T03:58:26.305Z",
    technoDueDate: "2022-08-18T03:58:26.305Z",
    status: .90,
  },
  {
    id: "DDD123",
    carPlate: "DDD123",
    brandId: 2,
    vehicleTypeId: 3,
    lineId: 2,
    bodyWorkId: 3,
    color: "azul",
    modelYear: 2015,
    serialNumber: "asdasdasd123",
    netWeight: 2000,
    emptyWeight: 1000,
    repoweredTo: 2018,
    axles: 2,
    propertyCard: "asdaeeer4545",
    fuelTypeId: 2,
    observations: "N/A",
    frontPhoto: "https://image.shutterstock.com/image-photo/hoofddorpmarch-14-2020-mercedes-started-600w-1708023739.jpg",
    backPhoto: "http://localhost:3000/api/v1/products",
    createdAt: "2022-08-18T03:58:26.305Z",
    updatedAt: "2022-08-18T03:58:26.305Z",
    driver: "Daniel Gonzalez",
    soatDueDate: "2022-08-18T03:58:26.305Z",
    technoDueDate: "2022-08-18T03:58:26.305Z",
    status: .70,
  },
];

const columns: GridColDef[] = [
  {
    field: "frontPhoto",
    headerName: "",
    width: 70,
    renderCell: (params) => (
      <Avatar
        alt="Remy Sharp"
        src={params.value}
        sx={{
          width: 45,
          height: 45,
          boxShadow: 1,
          borderRadius: 100,
        }}
      />
    ),
  },
  {
    field: "carPlate",
    headerName: "Placa",
    width: 150,
  },
  {
    field: "driver",
    headerName: "Conductor asignado",
    width: 250
  },
  {
    field: "soatDueDate",
    headerName: "SOAT",
    width: 200,
  },
  {
    field: "technoDueDate",
    headerName: "Tecnomecanica",
    width: 200,
  },
  {
    field: "status",
    headerName: "Cumplimiento Docs",
    width: 150,
    align: "center",
    // renderCell: renderProgress
  },
];

const Vehicles = () => {
  return (
    <Box>
      <PageTitle title="Vehículos"/>
      <Datagrid rows={rows} cols={columns} />
    </Box>
  );
};

export { Vehicles };
