import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GridColTypeDef, GridRenderCellParams, GridValueGetterParams } from "@mui/x-data-grid";
import { Datagrid } from "../../../components/Datagrid";
import RenderEditButton from "../../../components/GridEditButton";
import { dateFormatter } from "../../../utils/utils";
import { AppDispatch, RootState } from "../../../store";
import { getOwners, selectAllOwners } from "../../../store/owners/ownerSlice";
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

export const OwnersGrid = () => {
  const dispatch = useDispatch<AppDispatch>();
  const allOwners = useSelector(selectAllOwners);
  const loading = useSelector((state: RootState) => state.owners.isLoading);
  const error = useSelector((state: RootState) => state.owners.error);

  const columns = [
    {
      field: "documentType",
      headerName: "Tipo Documento",
      flex: 0.5,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.documentType?.description || ""}`,
      ...commonProps,
    },
    {
      field: "documentNumber",
      headerName: "Número de Documento",
      flex: 0.5,
      ...commonProps
    },
    {
      field: "firstName",
      headerName: "Nombres",
      flex: 0.5,
      ...commonProps,
    },
    {
      field: "lastName",
      headerName: "Apellidos",
      flex: 0.5,
      ...commonProps,
    },
    {
      field: "birthDate",
      ...birthDate
    },
    {
      field: "cellphone",
      headerName: "Teléfono",
      flex: 0.5,
      ...commonProps,
    },
    {
      field: "createdAt",
      ...createdAt,
    },
    {
      field: "balances",
      headerName: "Saldos",
      type: "boolean",
      flex: 0.3,
      ...commonProps,
    },
    {
      field: "advances",
      headerName: "Anticipos",
      type: "boolean",
      flex: 0.3,
      ...commonProps,
    },
    // {
    //   field: "status",
    //   headerName: "Cumplimiento Documentación",
    //   flex: 0.4,
    //   align: "center",
    //   renderCell: renderProgress,
    //   ...commonProps,
    // },
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

  useEffect(() => {
    dispatch(getOwners());
  }, [dispatch])

  return (
    <>
    {loading && <Loading />}
    <Datagrid
      rows={allOwners}
      cols={columns}
      rowId="documentNumber"
      buttonTitle="Crear Propietario"
      buttonUrl="crearPropietario"
      loading={loading} 
      error={error}
    />
    </>
  );
};
