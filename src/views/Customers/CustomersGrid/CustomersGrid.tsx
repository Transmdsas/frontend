import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GridColTypeDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Datagrid } from "./../../../components/Datagrid";
import  RenderEditButton from "./../../../components/GridEditButton";
import { dateFormatter } from "./../../../utils/utils";
import { getCustomers, selectAllCustomers } from "../../../store/customers/customerSlice";
import { AppDispatch, RootState } from "./../../../store";
import Loading from "../../../components/Loading";

const commonProps: GridColTypeDef = {
  align: "center",
  headerAlign: "center",
};

const createdAt: GridColTypeDef = {
  headerName: "Fecha de creación",
  flex: 0.7,
  type: "date",
  valueGetter: ({ value }) => dateFormatter.format(new Date(value)),
  ...commonProps,
};

export const CustomersGrid = () => {
  const dispatch = useDispatch<AppDispatch>();
  const allCustomers = useSelector(selectAllCustomers);
  const loading = useSelector((state: RootState) => state.customers.isLoading);
  const error = useSelector((state: RootState) => state.customers.error);

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch])



  const columns = [
      {
        field: "associatedCar",
        headerName: "Placa del vehículo",
        flex: 0.5,
        ...commonProps,
      },
      {
        field: "createdAt",
        ...createdAt,
      },

    
      {
        field: "actions",
        headerName: "",
        type: "actions",
        sortable: false,
        flex: 0.1,
        disableClickEventBubbling: true,
        ...commonProps,
        renderCell: (params:GridRenderCellParams) => {
          const { documentNumber } = params.row;
          return (
            <RenderEditButton to={`/customers/${documentNumber}`} />
          )
        },
      },
    ];

  return (
    <>
    {loading && <Loading />}
    <Datagrid rows={allCustomers} cols={columns} rowId="documentNumber" buttonTitle="Crear Cliente" buttonUrl="crearClientes" loading={loading} error={error}/>
    </>
  );
};