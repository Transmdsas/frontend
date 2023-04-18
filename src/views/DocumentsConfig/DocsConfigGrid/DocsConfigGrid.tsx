import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GridColDef,
  GridColTypeDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { Datagrid } from "./../../../components/Datagrid";
import RenderEditButton from "./../../../components/GridEditButton";
import Loading from "../../../components/Loading";
import { dateFormatter } from "../../../utils/utils";
import { AppDispatch, RootState } from "./../../../store";
import {
  getDocsConfig,
  selectAllDocsConfig,
} from "./../../../store/docsConfig/docConfigSlice";

const commonProps: GridColTypeDef = {
  align: "center",
  headerAlign: "center",
};

const createdAt: GridColTypeDef = {
  headerName: "Fecha de creación",
  flex: 0.5,
  type: "date",
  valueGetter: ({ value }) => dateFormatter.format(new Date(value)),
  ...commonProps,
};

const updatedAt: GridColTypeDef = {
  headerName: "Fecha de actualización",
  flex: 0.5,
  type: "date",
  valueGetter: ({ value }) => dateFormatter.format(new Date(value)),
  ...commonProps,
};

const columns: GridColDef[] = [
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
    flex: 0.1,
    //disableClickEventBubbling: true,
    ...commonProps,
    renderCell: (params: GridRenderCellParams) => {
      const { id } = params.row;
      return <RenderEditButton to={`editarDocConfig/${id}`} />;
    },
  },
];

export const DocsConfigGrid = () => {
  const dispatch = useDispatch<AppDispatch>();
  const allDocsConfigs = useSelector(selectAllDocsConfig);
  const loading = useSelector((state: RootState) => state.docsConfig.isLoading);
  const error = useSelector((state: RootState) => state.docsConfig.error);

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
