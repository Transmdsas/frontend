import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GridColTypeDef, GridRenderCellParams, GridValueGetterParams } from "@mui/x-data-grid";
import { Datagrid } from "./../../../components/Datagrid";
import  RenderEditButton from "./../../../components/GridEditButton";
import { dateFormatter } from "./../../../utils/utils";
import { getVehicles, selectAllVehicles } from "../../../store/vehicles/vehicleSlice";
import { AppDispatch, RootState } from "./../../../store";
import Loading from "../../../components/Loading";
import { renderAvatar } from "../../../components/GridAvatar";

const commonProps: GridColTypeDef = {
  align: "center",
  headerAlign: "center",
};
const createdAt: GridColTypeDef = {
  headerName: "Fecha de creación",
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
        flex: 0.1,
        renderCell: renderAvatar,
        altValue: "Foto frontal del vehiculo",
        ...commonProps,
      },
      {
        field: "carPlate",
        headerName: "Placa",
        flex: 0.2,
        ...commonProps,
      },
      {
        field: "brand",
        headerName: "Marca",
        flex: 0.3,
        valueGetter: (params: GridValueGetterParams) =>
          `${params.row.brand?.description || ""}`,
        ...commonProps,
      },
      {
        field: "vehicleType",
        headerName: "Tipo de Vehículo",
        flex: 0.3,
        valueGetter: (params: GridValueGetterParams) =>
          `${params.row.vehicleType?.description || ""}`,
        ...commonProps,
      },
      {
        field: "vehicleCode",
        headerName: "Código",
        flex: 0.2,
        valueGetter: (params: GridValueGetterParams) =>
          `${params.row.vehicleCode?.description || ""}`,
        ...commonProps,
      },
      {
        field: "vehicleFuelType",
        headerName: "Tipo de Combustible",
        flex: 0.3,
        valueGetter: (params: GridValueGetterParams) =>
          `${params.row.vehicleFuelType?.description || ""}`,
        ...commonProps,
      },
      {
        field: "modelYear",
        headerName: "Modelo",
        flex: 0.2,
        ...commonProps,
      },
      {
        field: "propertyCard",
        headerName: "Tarjeta de propiedad",
        flex: 0.3,
        ...commonProps,
      },
      {
        field: "vehicleLine",
        headerName: "Línea",
        flex: 0.3,
        valueGetter: (params: GridValueGetterParams) =>
          `${params.row.vehicleFuelType?.description || ""}`,
        ...commonProps,
      },
      {
        field: "createdAt",
        flex: 0.2,
        ...createdAt,
      },
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
