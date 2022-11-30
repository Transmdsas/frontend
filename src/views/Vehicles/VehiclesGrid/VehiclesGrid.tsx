import React, { useEffect, useMemo, useState } from "react";
import { GridColTypeDef } from "@mui/x-data-grid";
import { Datagrid } from "../../../components/Datagrid";
import { renderProgress } from "../../../components/ProgressBar";
import { renderEditButton } from "../../../components/GridEditButton";
import { dateFormatter } from "../../../utils/utils";
import { mockRows } from "./VehiclesGrid.mock";
import { getVehicles } from './../../../services/vehiclesService';

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



export const VehiclesGrid = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const loadVehicles = async () => {
      const data = await getVehicles();
      console.log(data);
      
      setRows(data);
    }

    loadVehicles()
      .catch(console.error);

  }, [])

  const columns = useMemo(
    () => [
      {
        field: "",
        headerName: "Placa del vehículo",
        flex: 0.5,
        ...commonProps,
      },
      {
        field: "carPlate",
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
    <Datagrid rows={rows} cols={columns} rowId="carPlate" buttonTitle="Crear Vehiculo" buttonUrl="crearVehiculo" />
  );
};
