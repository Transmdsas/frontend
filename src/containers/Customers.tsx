import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { GridRowsProp, GridColTypeDef } from "@mui/x-data-grid";
import Datagrid from "../components/Datagrid";
import { PageTitle } from "../components/PageTitle";
import { renderAvatar } from "../components/GridAvatar";
import { dateFormatter } from "../utils/utils";
import { renderProgress } from "../components/ProgressBar";
import { renderEditButton } from "../components/GridEditButton";
import { setButtonProps } from "../actions/Actions";


const commonProps: GridColTypeDef = {
  align: "center",
  headerAlign: "center",
};

const licenceDueDate: GridColTypeDef = {
  headerName: "Fecha Renovación Licencia",
  flex: 0.7,
  type: "date",
  valueGetter: ({ value }) => dateFormatter.format(new Date(value)),
  ...commonProps,
};

const socialSecurityDueDate: GridColTypeDef = {
  headerName: "Seguridad Social",
  flex: 0.7,
  type: "date",
  valueGetter: ({ value }) => dateFormatter.format(new Date(value)),
  ...commonProps,
};

const rows: GridRowsProp = [
  {
    avatar:
      "https://image.shutterstock.com/image-photo/young-man-asian-smiling-looking-600w-1848509833.jpg",
    firstName: "Michael",
    lastName: "Espinosa",
    documentType: "CC",
    documentNumber: "123456789",
    associatedCar: "ABC123",
    licenceDueDate: "2025-08-18T03:58:26.305Z",
    socialSecurityDueDate: "2022-09-18T03:58:26.305Z",
    status: 0.8,
  },
];

const Customers = () => {

  useSelector((state:any) => state.buttonProps);
  const dispatch = useDispatch();

  useEffect(() => {
    const createButton = {
      title: "Crear Cliente",
      url:'crearClientes'
    }

    dispatch(setButtonProps(createButton))
  }, []);

  const columns = useMemo(
    () => [
      {
        field: "avatar",
        headerName: "",
        filterable: false,
        disableColumnMenu: true,
        sortable: false,
        flex: 0.2,
        renderCell: renderAvatar,
        ...commonProps,
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
        field: "documentType",
        headerName: "Tipo de documento",
        flex: 0.5,
        ...commonProps,
      },
      {
        field: "documentNumber",
        headerName: "Número de Documento",
        flex: 0.5,
        ...commonProps,
      },
      {
        field: "associatedCar",
        headerName: "Placa del vehículo",
        flex: 0.5,
        ...commonProps,
      },
      {
        field: "licenceDueDate",
        ...licenceDueDate,
      },
      {
        field: "socialSecurityDueDate",
        ...socialSecurityDueDate,
      },
      {
        field: "status",
        headerName: "Cumplimiento Documentación",
        flex: 0.4,
        align: "center",
        renderCell: renderProgress,
        ...commonProps,
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
      <Box sx={{ display: "flex", justifyContent: "space-between" }} >
        <PageTitle title="Clientes" />
      </Box>
      <Datagrid rows={rows} cols={columns} rowId="documentNumber" />
    </Box>
  );
};

export { Customers };
