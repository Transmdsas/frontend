import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GridColTypeDef } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { setButtonProps } from "../actions/Actions";
import { Datagrid } from "../components/Datagrid";
import { renderEditButton } from "../components/GridEditButton";
import { PageTitle } from "../components/PageTitle";
import { dateFormatter } from "./../utils/utils";

interface ValueRow {
  id?: number;
  description?: string;
  parameterId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ValueProps {
  rows: ValueRow[];
}

const commonProps: GridColTypeDef = {
  align: "center",
  headerAlign: "center",
};

const createdAt: GridColTypeDef = {
  headerName: "Fecha creación",
  type: "date",
  flex: 1,
  valueGetter: ({ value }) => dateFormatter.format(new Date(value)),
  ...commonProps,
};

const updatedAt: GridColTypeDef = {
  headerName: "Fecha Actualización",
  type: "date",
  flex: 1,
  valueGetter: ({ value }) => dateFormatter.format(new Date(value)),
  ...commonProps,
};

const Values = ({ rows }: ValueProps) => {
  useSelector((state: any) => state.buttonProps);
  const dispatch = useDispatch();

  useEffect(() => {
    const createButton = {
      title: "",
      url: "#",
    };

    dispatch(setButtonProps(createButton));
  }, [dispatch]);

  const getDefaultId = (params: any) => {
    return `${params.row.id || 0}`;
  };

  const getDefaultTime = (params: any) => {
    return `${params.row.createdAt || new Date()}`;
  };
  const columns = useMemo(
    () => [
      {
        field: "id",
        headerName: "Id",
        flex: 0.3,
        ...commonProps,
        valueGetter: getDefaultId,
      },
      {
        field: "description",
        headerName: "Descripción",
        flex: 1,
        ...commonProps,
      },
      {
        field: "createdAt",
        ...createdAt,
        valueGetter: getDefaultTime,
      },
      {
        field: "updatedAt",
        ...updatedAt,
        valueGetter: getDefaultTime,
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
        <PageTitle title="Valores" />
      </Box>
      <Datagrid
        rows={rows}
        cols={columns}
        rowId="description"
        sx={{ height: "30%" }}
      />
    </Box>
  );
};

export { Values };
