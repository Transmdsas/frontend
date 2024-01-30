import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GridActionsCellItem,
  GridColDef,
  GridColTypeDef,
  GridRenderCellParams,
  GridRowId,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { Datagrid } from "../../../components/Datagrid";
import RenderEditButton from "./../../../components/GridEditButton";
import RenderDeleteButton from "./../../../components/GridDeleteButton";
import RenderViewButton from "./../../../components/GridViewButton";
import { AppDispatch, RootState } from "../../../store";
import {
  getOwners,
  selectAllOwners,
  deleteOwner,
} from "../../../store/owners/ownerSlice";
import Loading from "../../../components/Loading";
import useAlerts from "../../../hooks/useAlerts";

const commonProps: GridColTypeDef = {
  align: "center",
  headerAlign: "center",
};

export const OwnersGrid = () => {
  const { showConfirmation, showSuccess, showError } = useAlerts();
  const dispatch = useDispatch<AppDispatch>();
  const allOwners = useSelector(selectAllOwners);
  const loading = useSelector((state: RootState) => state.owners.isLoading);
  const error = useSelector((state: RootState) => state.owners.error);

  type Row = (typeof allOwners)[number];
  const onDelete = useCallback(
    (id: GridRowId) => () => {
      showConfirmation(async () => {
        await dispatch(deleteOwner(id.toString()))
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
            // onClick={viewHolder(params.row)}
          />,
          <GridActionsCellItem
            icon={<RenderEditButton to={`editarPropietario/${params.id}`} />}
            label="Editar"
          />,
          <GridActionsCellItem
            icon={<RenderDeleteButton />}
            label="Eliminar"
            onClick={onDelete(params.id)}
          />,
        ],
      },
    ],
    [onDelete]
  );

  useEffect(() => {
    dispatch(getOwners());
  }, [dispatch]);

  return (
    <>
      {loading && <Loading />}
      <Datagrid
        rows={allOwners}
        cols={columns}
        rowId="documentNumber"
        buttonTitle="Crear Propietario"
        buttonUrl="crearPropietario"
        loading={loading}
        error={error}
      />
    </>
  );
};
