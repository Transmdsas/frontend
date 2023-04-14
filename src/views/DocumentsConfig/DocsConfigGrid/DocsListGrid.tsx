import React from "react";
import { GridColDef, GridColTypeDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Datagrid } from "./../../../components/Datagrid";
import RenderEditButton from "./../../../components/GridEditButton";
import { dateFormatter } from "../../../utils/utils";

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
    field: "documentName",
    headerName: "Documento",
    flex: 0.3,
    ...commonProps,
  },
  {
    field: "documentDescription",
    headerName: "Descripción",
    flex: 0.5,
    ...commonProps,
  },
  {
    field: "isRequired",
    headerName: "Requerido",
    type: "boolean",
    flex: 0.3,
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
    field: "needDueDate",
    headerName: "Requiere fecha vencimiento",
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
      return <RenderEditButton to={`/documentsConfig/${id}`} />;
    },
  },
];

const DocsListGrid = () => {
  return (
    <>
      {/* {loading && <Loading />} */}
      <Datagrid
        rows={[]}
        cols={columns}
        rowId="id"
        buttonTitle="Crear Documento"
        //buttonUrl="crearDocConfig"
        // loading={loading}
        // error={error}
      />
    </>
  );
};

export default DocsListGrid;
