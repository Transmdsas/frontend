import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Stack } from "@mui/material";
import {
  GridColDef,
  GridColTypeDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import * as Yup from "yup";
import { AppDispatch, RootState } from "./../../../store";
import { Datagrid } from "./../../../components/Datagrid";
import RenderEditButton from "./../../../components/GridEditButton";
import RenderDeleteButton from "./../../../components/GridDeleteButton";
import { dateFormatter } from "../../../utils/utils";
import FormDialog from "../../../components/forms/Dialog/FormDialog";
import { Form } from "formik";
import { CheckBoxField, InputField } from "../../../components/forms";
import {
  createDocListItem,
  getDocsList,
  selectAllDocsList,
  resetDocsListState,
  updateDocListItem,
  deleteDocListItem
} from "./../../../store/docsList/docsListSlice";


import Loading from "../../../components/Loading";
import useAlerts from '../../../hooks/useAlerts';
const commonProps: GridColTypeDef = {
  align: "center",
  headerAlign: "center",
};

const createdAt: GridColTypeDef = {
  headerName: "Fecha de creación",
  flex: 0.4,
  type: "date",
  valueGetter: ({ value }) => new Date(value),
  ...commonProps,
};

const updatedAt: GridColTypeDef = {
  headerName: "Fecha de actualización",
  flex: 0.4,
  type: "date",
  valueGetter: ({ value }) => new Date(value),
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
  const { showConfirmation, showSuccess, errorMessage } = useAlerts();
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
      flex: 0.3,
      ...commonProps,
      renderCell: (params: GridRenderCellParams) => {
        const onEdit = (e: any) => {
          const currentRow = params.row;
          setFormInitialValues(currentRow);
          setOpenDialog(true);
          setEditMode(true);
        };
        const onDelete = (e: any) => {
          const currentRow = params.row;
          showConfirmation(() => {
            deleteDoc(currentRow.documentConfigId, currentRow.id);
          });
        };

        return (
          <Stack direction="row">
            <RenderEditButton onClick={onEdit} />
            <RenderDeleteButton onClick={onDelete} />
          </Stack>
        );
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

  const deleteDoc = async (configTypeId: number, id: number) => {
    try {
      await dispatch(deleteDocListItem({ documentConfigId: configTypeId, id: id }));
      showSuccess('Se ha borrado el registro');
    } catch (error) {
      errorMessage('Ocurrió un error eliminando el registro');
      console.error(error);
    }
  }
  
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

  const handleSubmit = async (formValues: any) => {
    if (editMode) {
      try {
        await dispatch(
          updateDocListItem({
            documentConfigId: formValues.documentConfigId,
            id: formValues.id,
            data: formValues,
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
        errorMessage('Ocurrió un error editando el registro');
        console.error(error);
      }
    } else {
      try {
        formValues.documentConfigId = docsConfigId || 0;
        await dispatch(createDocListItem(formValues))
          .unwrap()
          .then((res) => {
            setOpenDialog(false);
          });
        if (error) throw new Error(error);
      } catch (error) {
        setOpenDialog(false);
        errorMessage('Ocurrió un error creando el registro');
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
