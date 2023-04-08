import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GridColTypeDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Datagrid } from "../../../components/Datagrid";
import RenderEditButton from "../../../components/GridEditButton";
import { dateFormatter } from "../../../utils/utils";
import { AppDispatch, RootState } from "../../../store";
import { getOrders, selectAllOrders } from "../../../store/orders/orderSlice";
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

const birthDate: GridColTypeDef = {
  headerName: "Fecha de Nacimiento",
  flex: 0.7,
  type: "date",
  valueGetter: ({ value }) => dateFormatter.format(new Date(value)),
  ...commonProps,
};


export const OrdersGrid = () => {
  const dispatch = useDispatch<AppDispatch>();
  const allOrders = useSelector(selectAllOrders);
  const loading = useSelector((state: RootState) => state.owners.isLoading);
  const error = useSelector((state: RootState) => state.owners.error);
  
  useEffect(() => {
    dispatch(getOrders());
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
            <RenderEditButton to={`/owners/${documentNumber}`} />
          )
        },
      },
    ];
  
    return (
      <>
      {loading && <Loading />}
      <Datagrid rows={allOrders} cols={columns} rowId="documentNumber" buttonTitle="Crear O.C" buttonUrl="crearOrdenCargue" loading={loading} error={error}/>
      </>
    );
  };