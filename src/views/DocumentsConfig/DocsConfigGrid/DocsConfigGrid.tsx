import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GridActionsCellItem,
  GridColDef,
  GridColTypeDef,
  GridRowId,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { Datagrid } from "./../../../components/Datagrid";
import RenderEditButton from "./../../../components/GridEditButton";
import RenderDeleteButton from "./../../../components/GridDeleteButton";
import Loading from "../../../components/Loading";
import { AppDispatch, RootState } from "./../../../store";
import {
  getDocsConfig,
  selectAllDocsConfig,
  deleteDocsConfig,
} from "./../../../store/docsConfig/docConfigSlice";
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

const updatedAt: GridColTypeDef = {
  headerName: "Fecha de actualización",
  flex: 0.5,
  type: "date",
  valueGetter: ({ value }) => new Date(value),
  ...commonProps,
};

export const DocsConfigGrid = () => {
  const { showConfirmation, showSuccess, showError } = useAlerts();
  const dispatch = useDispatch<AppDispatch>();
  const allDocsConfigs = useSelector(selectAllDocsConfig);
  const loading = useSelector((state: RootState) => state.docsConfig.isLoading);
  const error = useSelector((state: RootState) => state.docsConfig.error);

  type Row = (typeof allDocsConfigs)[number];

  const onDelete = React.useCallback(
    (id: GridRowId) => () => {
      showConfirmation(async () => {
        await dispatch(deleteDocsConfig(parseInt(id.toString())))
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

  const columns = React.useMemo<GridColDef<Row>[]>(
    () => [
      {
        field: "configType",
        headerName: "Tipo de Configuración",
        flex: 0.5,
        valueGetter: (params: GridValueGetterParams) =>
          `${params.row.configType?.description || ""}`,
        ...commonProps,
      },
      {
        field: "referenceCode",
        headerName: "Código Referencia",
        flex: 0.5,
        valueGetter: (params: GridValueGetterParams) =>
          `${params.row.referenceCode?.description || ""}`,
        ...commonProps,
      },
      {
        field: "isActive",
        headerName: "Activo",
        type: "boolean",
        flex: 0.3,
        ...commonProps,
      },
      {
        field: "createdAt",
        ...createdAt,
      },
      {
        field: "updatedAt",
        ...updatedAt,
      },
      {
        field: "actions",
        headerName: "",
        type: "actions",
        sortable: false,
        flex: 0.3,
        ...commonProps,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<RenderEditButton to={`editarDocConfig/${params.id}`} />}
            label="Editar"
          />,
          <GridActionsCellItem
            icon={<RenderDeleteButton/>}
            label="Eliminar"
            onClick={onDelete(params.id)}
          />,
        ],
      },
    ],
    [onDelete]
  );

  useEffect(() => {
    dispatch(getDocsConfig());
  }, [dispatch]);

  return (
    <>
      {loading && <Loading />}
      <Datagrid
        rows={allDocsConfigs}
        cols={columns}
        rowId="id"
        buttonTitle="Crear Doc. Config."
        buttonUrl="crearDocConfig"
        loading={loading}
        error={error}
      />
    </>
  );
};
