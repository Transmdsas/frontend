import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { GridColTypeDef, GridRowsProp } from "@mui/x-data-grid";
import { PageTitle } from "../components/PageTitle";
import { renderEditButton } from "../components/GridEditButton";
import { Datagrid } from "../components/Datagrid";
import { dateFormatter } from "./../utils/utils";
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
  // const params = useSelector((store:any) => store.ParametersReducers);
  // useSelector((state: any) => state.buttonProps);
  // const dispatch = useDispatch();

  // //console.log('from params', params.parameters.parameters);
  
  // useEffect(() => {
  //   const createButton = {
  //     title: "Crear Parametro",
  //     url: "crearParametro",
  //   };

  //   dispatch(setButtonProps(createButton));
  // }, [dispatch]);
  const mockRows: GridRowsProp = [
    {
      id:
        "https://image.shutterstock.com/image-photo/young-man-asian-smiling-looking-600w-1848509833.jpg",
        description: "Michael",
      createdAt: "2019-08-18T03:58:26.305Z",
      updatedAt: "2019-08-18T03:58:26.305Z",
    },
  ];
  
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
      <Datagrid rows={mockRows} cols={columns} rowId="id" buttonTitle="Crear Parametro"  buttonUrl="crearParametro" />
    </Box>
  );
};

export { Parameters };
