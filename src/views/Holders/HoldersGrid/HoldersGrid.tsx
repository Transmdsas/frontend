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
import { Datagrid } from "./../../../components/Datagrid";
import RenderEditButton from "./../../../components/GridEditButton";
import RenderDeleteButton from "./../../../components/GridDeleteButton";
import RenderViewButton from "./../../../components/GridViewButton";
import {
  getHolders,
  selectAllHolders,
  deleteHolder,
} from "../../../store/holders/holderSlice";
import { AppDispatch, RootState } from "./../../../store";
import Loading from "../../../components/Loading";
import useAlerts from "../../../hooks/useAlerts";

const commonProps: GridColTypeDef = {
  align: "center",
  headerAlign: "center",
};

const createdAt: GridColTypeDef = {
  headerName: "Fecha de creación",
  flex: 0.5,
  type: "date",
  valueGetter: ({ value }) => new Date(value),
  ...commonProps,
};

const birthDate: GridColTypeDef = {
  headerName: "Fecha de Nacimiento",
  flex: 0.5,
  type: "date",
  valueGetter: ({ value }) => new Date(value),
  ...commonProps,
};

export const HoldersGrid = () => {
  const { showConfirmation, showSuccess, showError } = useAlerts();
  const dispatch = useDispatch<AppDispatch>();
  const allHolders = useSelector(selectAllHolders);
  const loading = useSelector((state: RootState) => state.holders.isLoading);
  const error = useSelector((state: RootState) => state.holders.error);

  useEffect(() => {
    dispatch(getHolders());
  }, [dispatch]);

  type Row = (typeof allHolders)[number];
  const onDelete = useCallback(
    (id: GridRowId) => () => {
      showConfirmation(async () => {
        await dispatch(deleteHolder(id.toString()))
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
        valueGetter: (params: GridRenderCellParams) => (
          params.api.getRowIndexRelativeToVisibleRows(params.id) +1
        ),
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
            onClick={() => console.log("viendo tenedor")}
          />,
          <GridActionsCellItem
            icon={<RenderEditButton to={`editarTenedor/${params.id}`} />}
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

  return (
    <>
      {loading && <Loading />}
      <Datagrid
        rows={allHolders}
        cols={columns}
        rowId="documentNumber"
        buttonTitle="Crear Tenedor"
        buttonUrl="crearTenedor"
        loading={loading}
        error={error}
      />
    </>
  );
};
