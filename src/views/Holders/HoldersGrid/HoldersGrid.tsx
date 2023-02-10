import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GridColTypeDef, GridActionsCellItem, GridRowId } from "@mui/x-data-grid";
import { Datagrid } from "./../../../components/Datagrid";
//import { renderProgress } from "./../../../components/ProgressBar";
import { RenderEditButton } from "./../../../components/GridEditButton";
import { dateFormatter } from "./../../../utils/utils";
import { getHolders, selectAllHolders } from "../../../store/holders/holderSlice";
import { AppDispatch } from "./../../../store";
import UpdateIcon from '@mui/icons-material/Update';

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

export const HoldersGrid = () => {
  const allHolders = useSelector(selectAllHolders);
  const dispatch = useDispatch<AppDispatch>();

  console.log(allHolders);
  useEffect(() => {
    dispatch(getHolders());
  }, [])

  const handleUpdate = (id: GridRowId) => () =>  {
    console.log("Edited ID", id);
  };

  const columns = [
      {
        field: "documentTypeId", 
        headerName: "Tipo Documento",
        flex: 0.4,
        ...commonProps
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
        flex: 0.1,
        ...commonProps,
        //renderCell: RenderEditButton,
        getActions: ({ id }:any) => {
          return [
            <GridActionsCellItem 
              icon={<RenderEditButton />}
              label="Editar"
              onClick={handleUpdate(id)}
            />,

          ]
        }
      },
    ];

  return (
    <Datagrid rows={allHolders} cols={columns} rowId="documentNumber" buttonTitle="Crear Tenedor"  buttonUrl="crearTenedor"/>
  );
};
