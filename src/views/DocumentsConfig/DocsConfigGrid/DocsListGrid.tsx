import React, { useState } from "react";
import {
  GridColDef,
  GridColTypeDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { Datagrid } from "./../../../components/Datagrid";
import RenderEditButton from "./../../../components/GridEditButton";
import { dateFormatter } from "../../../utils/utils";
import FormDialog from "../../../components/forms/Dialog/FormDialog";
import { Button, Grid, Stack } from "@mui/material";
import { Form } from "formik";
import { CheckBoxField, InputField } from "../../../components/forms";

const commonProps: GridColTypeDef = {
  align: "center",
  headerAlign: "center",
};

const createdAt: GridColTypeDef = {
  headerName: "Fecha de creación",
  flex: 0.4,
  type: "date",
  valueGetter: ({ value }) => dateFormatter.format(new Date(value)),
  ...commonProps,
};

const updatedAt: GridColTypeDef = {
  headerName: "Fecha de actualización",
  flex: 0.4,
  type: "date",
  valueGetter: ({ value }) => dateFormatter.format(new Date(value)),
  ...commonProps,
};

const columns: GridColDef[] = [
  {
    field: "documentName",
    headerName: "Documento",
    flex: 0.4,
    ...commonProps,
  },
  {
    field: "documentDescription",
    headerName: "Descripción",
    flex: 0.4,
    ...commonProps,
  },
  {
    field: "isRequired",
    headerName: "Requerido",
    type: "boolean",
    flex: 0.3,
    ...commonProps,
  },
  {
    field: "isActive",
    headerName: "Activo",
    type: "boolean",
    flex: 0.3,
    ...commonProps,
  },
  {
    field: "needDueDate",
    headerName: "Fecha de vencimiento",
    type: "boolean",
    flex: 0.4,
    ...commonProps,
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
    sortable: false,
    flex: 0.1,
    //disableClickEventBubbling: true,
    ...commonProps,
    renderCell: (params: GridRenderCellParams) => {
      const { id } = params.row;
      return <RenderEditButton to={`/documentsConfig/${id}`} />;
    },
  },
];

const initialValues = {
  documentName: "",
  documentDescription: "",
  isRequired: false,
  isActive: false,
  needDueDate: false,
};

interface DocsListGridProps {
  docsConfigId?: number;
}

interface DocsRows {
  documentName: string;
  documentDescription: string;
  isRequired: boolean;
  isActive: boolean;
  needDueDate: boolean;
  documentConfigId?: number;
  createdAt?: string;
  updatedAt?: string;
}

const DocsListGrid = ({ docsConfigId }: DocsListGridProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [rows, setRows] = useState<DocsRows[]>([]);

  const _handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmit = (values: DocsRows) => {
    values.documentConfigId = docsConfigId || 0;
    values.createdAt = new Date().toISOString();
    values.updatedAt = new Date().toISOString();
    setRows((prevRows) => [...prevRows, values]);
    console.log(values);
    setOpenDialog(false);
  };

  return (
    <>
      <Datagrid
        rows={rows}
        cols={columns}
        rowId="documentName"
        buttonTitle="Crear Documento"
        external={true}
        handleClick={_handleClick}
        disabledButton={docsConfigId !== undefined && docsConfigId !== 0 ? false : true}        
      />
      <FormDialog
        open={openDialog}
        title="Agregar Documento"
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={null}
        render={(formikProps) => (
          <Form onSubmit={formikProps.handleSubmit}>
            <Grid
              container
              spacing={4}
              sx={{
                mb: 5,
                justifyContent: "space-evenly",
              }}
            >
              <InputField
                label="Documento"
                name="documentName"
                type={"text"}
                md={6}
                lg={6}
              />
              <InputField
                label="Descripción"
                name="documentDescription"
                type={"text"}
                md={6}
                lg={6}
              />
              <CheckBoxField name="isRequired" label="Es requerido?" />
              <CheckBoxField
                name="needDueDate"
                label="Requiere fecha de vencimiento?"
              />
              <CheckBoxField name="isActive" label="Activo" />
            </Grid>
            <Grid item xs={12} alignContent={"rigth"}>
              <Stack direction="row" justifyContent="end">
                <Button
                  disabled={formikProps.isSubmitting}
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mr: 2 }}
                  //onClick={formikProps.handleSubmit}
                >
                  Guardar
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  sx={{ mr: 4 }}
                  onClick={handleCloseDialog}
                >
                  Cancelar
                </Button>
              </Stack>
            </Grid>
          </Form>
        )}
        onClose={handleCloseDialog}
      />
    </>
  );
};

export default DocsListGrid;
