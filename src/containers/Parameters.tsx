import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { GridColTypeDef } from "@mui/x-data-grid";
import { PageTitle } from "../components/PageTitle";
import { RenderEditButton } from "../components/GridEditButton";
import { Datagrid } from "../components/Datagrid";
import { dateFormatter } from "./../utils/utils";
import { getParameters, selectAllParams } from "../store/parameters/parameterSlice";
import { AppDispatch } from "../store";
// import { setButtonProps } from "../actions/Actions";

const commonProps: GridColTypeDef = {
  align: "center",
  headerAlign: "center",
};

const createdAt: GridColTypeDef = {
  headerName: "Fecha creación",
  type: "date",
  flex: 1,
  valueGetter: ({ value }) => dateFormatter.format(new Date(value)),
  ...commonProps
};

const updatedAt: GridColTypeDef = {
  headerName: "Fecha Actualización",
  type: "date",
  flex: 1,
  valueGetter: ({ value }) => dateFormatter.format(value && new Date(value)),
  ...commonProps
};

const Parameters = () => {
  const allParams = useSelector(selectAllParams);
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    dispatch(getParameters());
  }, []);

  const columns = useMemo(
    () => [
      {
        field: "id",
        headerName: "Id",
        flex: 0.3,
        ...commonProps
      },
      {
        field: "description",
        headerName: "Descripción",
        flex: 1,
        ...commonProps
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
        flex: 0.1,
        renderCell: RenderEditButton,
        ...commonProps,
      },
    ],
    []
  );

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <PageTitle title="Parametros" />
      </Box>
      <Datagrid rows={allParams} cols={columns} rowId="id" buttonTitle="Crear Parametro"  buttonUrl="crearParametro" />
    </Box>
  );
};

export { Parameters };
