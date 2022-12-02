import { Grid } from "@mui/material";
import { GridColTypeDef, GridRowsProp } from "@mui/x-data-grid";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Datagrid } from "../../../components/Datagrid";
// import { setButtonProps } from "../../../actions/Actions";
import {
  DropdownField,
  InputField,
  CalendarField,
  UploadButton,
} from "../../../components/forms";
import { dateFormatter } from "../../../utils/utils";


const mockRows: GridRowsProp = [
  {
    documentType: "Cédula",
    documentName: "Test Document",
    fileType: "PDF",
    dueDate: "2025-08-18T03:58:26.305Z",
    comments: "Comentarios de pruebas",
  },
];

const selectData = [
  { description: "Cédula", id: "10" },
  { description: "Licencia", id: "20" },
  { description: "Soat", id: "30" },
  { description: "Rut", id: "40" },
];

const commonProps: GridColTypeDef = {
  align: "center",
  headerAlign: "center",
};

export const DocumentsForm = () => {
  // useSelector((state: any) => state.buttonProps);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const createButton = {
  //     title: "",
  //     url: "#",
  //   };

  //   dispatch(setButtonProps(createButton));
  // }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        field: "documentType",
        headerName: "Tipo de Documento",
        flex: 0.5,
        ...commonProps,
      },
      {
        field: "documentName",
        headerName: "Nombre del Archivo",
        flex: 0.5,
        ...commonProps,
      },
      {
        field: "fileType",
        headerName: "Tipo de Archivo",
        flex: 0.3,
        ...commonProps,
      },
      {
        field: "dueDate",
        headerName: "Fecha de creación",
        flex: 0.7,
        type: "date",
        valueGetter: ({ value }: any) => dateFormatter.format(new Date(value)),
        ...commonProps,
      },

      {
        field: "comments",
        headerName: "Comentarios",
        flex: 0.4,
        align: "center",
        ...commonProps,
      },
    ],
    []
  );

  return (
    <>
      <DropdownField
        name={"documentTypeId"}
        label={"Tipo de Documento"}
        data={selectData}
      />
      <InputField name={"comments"} label={"Comentarios"} type={"text"} />
      <CalendarField
        label={"Fecha de Caducidad"}
        name={"dueDate"}
        minDate={new Date()}
      />
      <UploadButton label={"Cargar Documento"} name={"document"} />
      <Grid item xs={12} alignContent={"rigth"}>
        <Datagrid rows={mockRows} cols={columns} rowId="documentName" />
      </Grid>
    </>
  );
};
