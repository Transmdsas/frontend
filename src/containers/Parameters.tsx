import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { GridColTypeDef } from "@mui/x-data-grid";
import { PageTitle } from "../components/PageTitle";
import { renderEditButton } from "../components/GridEditButton";
import Datagrid from "../components/Datagrid";
import { dateFormatter } from "./../utils/utils";
import { setButtonProps, setLoading, setParameters } from "../actions/Actions";

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
  valueGetter: ({ value }) => dateFormatter.format(new Date(value)),
  ...commonProps
};

const Parameters = () => {
  const params = useSelector((store:any) => store.ParametersReducers);
  useSelector((state: any) => state.buttonProps);
  const dispatch = useDispatch();

  console.log('from params', params.parameters.parameters);
  
  useEffect(() => {
    const createButton = {
      title: "Crear Parametro",
      url: "crearParametro",
    };

    // const fetchParams = async () => {
    //   dispatch(setLoading(true));
    //   dispatch(setParameters(params));
    //   dispatch(setLoading(false));
    // }

    //fetchParams();
    dispatch(setButtonProps(createButton));
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
        renderCell: renderEditButton,
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
      <Datagrid rows={params.parameters.parameters} cols={columns} rowId="id" />
    </Box>
  );
};

export { Parameters };
