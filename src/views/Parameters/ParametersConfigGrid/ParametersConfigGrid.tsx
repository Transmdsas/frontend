import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GridColDef,
  GridColTypeDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { Datagrid } from "../../../components/Datagrid";
import RenderEditButton from "../../../components/GridEditButton";
import Loading from "../../../components/Loading";
import { dateFormatter } from "../../../utils/utils";
import { AppDispatch, RootState } from "../../../store";
import {
  getParameters,
  selectAllParameters,
  selectParametersById
} from "../../../store/parameters/parameterSlice";

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
    field: "id",
    headerName: "Id",
    flex: 0.5,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.id?.createdAt || ""}`,
    ...commonProps,
  },
  {
    field: "description",
    headerName: "Descripción",
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

export const ParametersConfigGrid = () => {
  const dispatch = useDispatch<AppDispatch>();
  const AllParameters = useSelector(selectAllParameters);
  const loading = useSelector((state: RootState) => state.docsConfig.isLoading);
  const error = useSelector((state: RootState) => state.docsConfig.error);

  useEffect(() => {
    dispatch(getParameters());
  }, [dispatch]);

  return (
    <>
      {loading && <Loading />}
      <Datagrid
        rows={AllParameters}
        cols={columns}
        rowId="id"
        buttonTitle="Crear Parametro."
        buttonUrl="crearParametro"
        loading={loading}
        error={error}
      />
    </>
  );
};