import React from "react";
import { GridColTypeDef } from "@mui/x-data-grid";
import { Button, Grid } from "@mui/material";
import {
  CalendarField,
  DropdownField,
  InputField,
  UploadButton,
} from "./../../../components/forms";
import { Datagrid } from "../../../components/Datagrid";
import { dateFormatter } from "../../../utils/utils";

const commonProps: GridColTypeDef = {
  align: "center",
  headerAlign: "center",
};

export const DocumentsForm = () => {
  const columns = [
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
  ];

  return (
    <React.Fragment>
      <DropdownField
        name="documenType"
        label="Tipo de documento"
        parameterid={14}
        md={4}
        lg={3}
      />
      <InputField
        label="Comentario"
        name="comment"
        type={"text"}
        md={4}
        lg={3}
      />
      <CalendarField
        label="Fecha de vencimiento"
        name="dueDate"
        minDate={new Date()}
      />
      <UploadButton label={"Cargar Documento"} name={"document"} md={4} lg={3}/>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "end", paddingRight: 1 }}>
        <Button
          onClick={() => console.log("guardar documento")}
          variant="contained"
          color="primary"
        >
          Guardar Documento
        </Button>
      </Grid>

      <Grid item xs={12} alignContent={"rigth"} mt={4}>
        <Datagrid
          rows={[]}
          cols={columns}
          rowId="documentName"
          buttonTitle=""
        />
      </Grid>
    </React.Fragment>
  );
};
