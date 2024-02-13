import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GridActionsCellItem,
  GridColDef,
  GridColTypeDef,
  GridRenderCellParams,
  GridRowId,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { Datagrid } from "./../../../components/Datagrid";
import RenderEditButton from "./../../../components/GridEditButton";
import RenderDeleteButton from "./../../../components/GridDeleteButton";
import RenderViewButton from "./../../../components/GridViewButton";
import {
  deleteDriver,
  getDrivers,
  selectAllDrivers,
} from "../../../store/drivers/driverSlice";
import { AppDispatch, RootState } from "./../../../store";
import Loading from "../../../components/Loading";
import useAlerts from "../../../hooks/useAlerts";
import { Driver } from "../../../store/drivers/types";

const commonProps: GridColTypeDef = {
  align: "center",
  headerAlign: "center",
};

export const DriversGrid = () => {
  const { showConfirmation, showSuccess, showError } = useAlerts();
  const dispatch = useDispatch<AppDispatch>();
  const allDrivers = useSelector(selectAllDrivers);
  const loading = useSelector((state: RootState) => state.drivers.isLoading);
  const error = useSelector((state: RootState) => state.drivers.error);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [openView, setOpenView] = useState(false);

  useEffect(() => {
    dispatch(getDrivers());
  }, [dispatch]);

  type Row = (typeof allDrivers)[number];
  const onDelete = useCallback(
    (id: GridRowId) => () => {
      showConfirmation(async () => {
        await dispatch(deleteDriver(id.toString()))
          .unwrap()
          .then((res) => {
            showSuccess("Se ha borrado el registro");
          })
          .catch((err) => {
            console.error(err);
            showError(err.message);
          });
      });
    },
    [dispatch, showConfirmation, showError, showSuccess]
  );

  const viewDriver = useCallback(
    (driverData: Driver) => () => {
      setSelectedDriver(driverData);
      setOpenView(true);
    },
    []
  );

  const columns = useMemo<GridColDef<Row>[]>(
    () => [
      {
        field: "rowNumber",
        headerName: "#",
        width: 0.1,
        align: "center",
        headerAlign: "center",
        valueGetter: (params: GridRenderCellParams) =>
          params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
      },
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
      headerName: "Tipo Documento",
      flex: 0.5,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.documentType?.description || ""}`,
      ...commonProps,
    },
    {
      field: "documentNumber",
      headerName: "Número de Documento",
      flex: 0.5,
      ...commonProps,
    },
    {
      field: "cellphone",
      headerName: "Teléfono",
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
      field: "actions",
      headerName: "",
      type: "actions",
      sortable: false,
      flex: 0.4,
      ...commonProps,
      getActions: (params) => [
        <GridActionsCellItem
            icon={<RenderViewButton />}
            label="Visualizar"
            onClick={viewDriver(params.row)}
          />,
          <GridActionsCellItem
            icon={<RenderEditButton to={`editarConductor/${params.id}`} />}
            label="Editar"
          />,
          <GridActionsCellItem
            icon={<RenderDeleteButton />}
            label="Eliminar"
            onClick={onDelete(params.id)}
          />,
      ]
    },
  ], [onDelete, viewDriver] );

  return (
    <>
      {loading && <Loading />}
      <Datagrid
        rows={allDrivers}
        cols={columns}
        rowId="documentNumber"
        buttonTitle="Crear Conductor"
        buttonUrl="crearConductor"
        loading={loading}
        error={error}
      />
       {selectedDriver && (
        <>
          <div>Hola conductores</div>
        </>
      )}
    </>
  );
};
