import React, { useEffect, useState } from "react";
import {
  GridColDef,
  GridColTypeDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import * as Yup from "yup";
import { Datagrid } from "./../../../components/Datagrid";
import RenderEditButton from "./../../../components/GridEditButton";
import { dateFormatter } from "../../../utils/utils";
import FormDialog from "../../../components/forms/Dialog/FormDialog";
import { Button, Grid, Stack } from "@mui/material";
import { Form } from "formik";
import { CheckBoxField, InputField } from "../../../components/forms";
import {
  createDocListItem,
  getDocsList,
  selectAllDocsList,
  resetDocsListState,
  updateDocListItem,
} from "./../../../store/docsList/docsListSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./../../../store";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";

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

const initialValues = {
  documentName: "",
  documentDescription: "",
  isRequired: false,
  isActive: false,
  needDueDate: false,
};

const validationSchema = Yup.object().shape({
  documentName: Yup.string().required("El nombre del documento es requerido"),
  documentDescription: Yup.string().nullable(),
  isRequired: Yup.boolean().default(false),
  isActive: Yup.boolean().default(false),
});
interface DocsListGridProps {
  docsConfigId?: number | null;
}

const DocsListGrid = ({ docsConfigId }: DocsListGridProps) => {
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
      ...commonProps,
      renderCell: (params: GridRenderCellParams) => {
        const onClick = (e: any) => {
          const currentRow = params.row;
          setFormInitialValues(currentRow);
          setOpenDialog(true);
          setEditMode(true);
        };
        return <RenderEditButton onClick={onClick} />;
      },
    },
  ];

  const [openDialog, setOpenDialog] = useState(false);
  const rows = useSelector(selectAllDocsList);
  const error = useSelector((state: RootState) => state.docsList.error);
  const loading = useSelector((state: RootState) => state.docsList.isLoading);
  const [formInitialValues, setFormInitialValues] = useState(initialValues);
  const [editMode, setEditMode] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(resetDocsListState());
    if (
      docsConfigId !== null &&
      docsConfigId !== undefined &&
      docsConfigId !== 0
    )
      dispatch(getDocsList(docsConfigId));
  }, [docsConfigId, dispatch]);

  const _handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setEditMode(false);
    setFormInitialValues(initialValues);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormInitialValues(initialValues);
    setEditMode(false);
  };

  const handleSubmit = async (values: any) => {
    if (editMode) {
      try {
        await dispatch(
          updateDocListItem({
            documentConfigId: values.documentConfigId,
            id: values.id,
            data: values,
          })
        )
          .unwrap()
          .then((res) => {
            setOpenDialog(false);
            setEditMode(false);
          });
      } catch (error) {
        setEditMode(false);
        setOpenDialog(false);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Ocurrió un error editando el registro",
          showConfirmButton: false,
          timer: 1500,
        });
        console.error(error);
      }
    } else {
      try {
        values.documentConfigId = docsConfigId || 0;
        await dispatch(createDocListItem(values))
          .unwrap()
          .then((res) => {
            console.log(res);
            setOpenDialog(false);
          });
        if (error) throw new Error(error);
      } catch (error) {
        setOpenDialog(false);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Ocurrió un error creando el registro",
          showConfirmButton: false,
          timer: 1500,
        });
        console.error(error);
      }
    }
  };

  return (
    <>
      {loading && <Loading />}
      <Datagrid
        rows={rows}
        cols={columns}
        rowId="documentName"
        buttonTitle="Crear Documento"
        external={true}
        handleClick={_handleClick}
        disabledButton={
          docsConfigId !== undefined && docsConfigId !== 0 ? false : true
        }
      />
      <FormDialog
        open={openDialog}
        title="Agregar Documento"
        initialValues={formInitialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
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
