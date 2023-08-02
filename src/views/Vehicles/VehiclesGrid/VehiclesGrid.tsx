import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GridColTypeDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Datagrid } from "./../../../components/Datagrid";
import  RenderEditButton from "./../../../components/GridEditButton";
import { dateFormatter } from "./../../../utils/utils";
import { getVehicles, selectAllVehicles } from "../../../store/vehicles/vehicleSlice";
import { AppDispatch, RootState } from "./../../../store";
import Loading from "../../../components/Loading";
import { renderAvatar } from "../../../components/GridAvatar";
import { renderProgress } from "../../../components/ProgressBar";


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
  const dispatch = useDispatch<AppDispatch>();
  const allVehicles = useSelector(selectAllVehicles);
  const loading = useSelector((state: RootState) => state.vehicles.isLoading);
  const error = useSelector((state: RootState) => state.vehicles.error);

  useEffect(() => {
    dispatch(getVehicles());
  }, [dispatch])
  const columns = [
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
      {
        field: "createdAt",
        ...createdAt,
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
        field: "actions",
        headerName: "",
        type: "actions",
        sortable: false,
        flex: 0.1,
        disableClickEventBubbling: true,
        ...commonProps,
        renderCell: (params:GridRenderCellParams) => {
          const { documentNumber } = params.row;
          return (
            <RenderEditButton to={`/vehicles/${documentNumber}`} />
          )
        },
      },
    ];

    return (
      <>
      {loading && <Loading />}
      <Datagrid rows={allVehicles} cols={columns} rowId="carPlate" buttonTitle="Crear Vehiculo" buttonUrl="crearVehiculo" loading={loading} error={error}/>
      </>
    );
  };
