import React, { useEffect, useMemo } from "react";
import { GridColTypeDef } from "@mui/x-data-grid";
import { Datagrid } from "../../../components/Datagrid";
import { renderProgress } from "../../../components/ProgressBar";
import { renderEditButton } from "../../../components/GridEditButton";
import { dateFormatter } from "../../../utils/utils";
import { renderAvatar } from "../../../components/GridAvatar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { AllVehicles, fetchVehicles } from "../../../store/vehicles/vehicleSlice";

const commonProps: GridColTypeDef = {
  align: "center",
  headerAlign: "center",
};

// const soatDueDate: GridColTypeDef = {
//   headerName: "SOAT",
//   type: "date",
//   valueGetter: ({ value }) => value && dateFormatter.format(new Date(value)),
//   flex: 0.7,
//   ...commonProps,
// };

// const technoDueDate: GridColTypeDef = {
//   headerName: "Tecnomecanica",
//   flex: 0.7,
//   type: "date",
//   valueGetter: ({ value }) => value && dateFormatter.format(new Date(value)),
//   ...commonProps,
// };


export const VehiclesGrid = () => {
  const allVehicles = useSelector(AllVehicles);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchVehicles());
  }, [])

  console.log(allVehicles);

  const columns = useMemo(
    () => [
      {
        field: "frontPhoto",
        headerName: "",
        filterable: false,
        disableColumnMenu: true,
        sortable: false,
        flex: 0.2,
        renderCell: renderAvatar,
        ...commonProps,
      },
      {
        field: "carPlate",
        headerName: "Placa",
        flex: 0.5,
        ...commonProps,
      },
      {
        field: "driver",
        headerName: "Conductor asignado",
        flex: 1,
        ...commonProps,
      },
      // {
      //   field: "soatDueDate",
      //   ...soatDueDate,
      // },
      // {
      //   field: "technoDueDate",
      //   ...technoDueDate,
      // },
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
    <Datagrid rows={allVehicles} cols={columns} rowId="carPlate" buttonTitle="Crear Vehiculo" buttonUrl="crearVehiculo" />
  );
};
