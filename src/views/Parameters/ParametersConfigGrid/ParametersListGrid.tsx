import React, { useEffect, useState } from "react";
import {
  GridColDef,
  GridColTypeDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import * as Yup from "yup";
import { Datagrid } from "../../../components/Datagrid";
import RenderEditButton from "../../../components/GridEditButton";
import RenderDeleteButton from "../../../components/GridDeleteButton";
import { dateFormatter } from "../../../utils/utils";
import FormDialog from "../../../components/forms/Dialog/FormDialog";
import { Button, Grid, Stack } from "@mui/material";
import { Form, useFormikContext } from "formik";
import { CheckBoxField, InputField } from "../../../components/forms";
import {
  getParameters,
  // selectAllParameters,
  createParameters,
  // resetParametersListState,
  // updateParameters,
  // deleteParamteres
} from "../../../store/parameters/parameterSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";
import { AsyncThunkAction, Dispatch, AnyAction } from "@reduxjs/toolkit";
import { Parameter } from "../../../store/parameters/types";
import { error } from "console";


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

// const Parameters = {
//   parametersName: "",
//   parametersDescription: "",
//   isRequired: false,
//   isActive: false,
//   needDueDate: false,
// };

const validationSchema = Yup.object().shape({
  parametersName: Yup.string().required("El nombre del documento es requerido"),
  parametersDescription: Yup.string().nullable(),
  isRequired: Yup.boolean().default(false),
  isActive: Yup.boolean().default(false),
});
interface ParametersListGridProps {
  parametersId?: number | null;
}

const parametersGrid = ({ parametersId }: ParametersListGridProps) => {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      flex: 0.4,
      ...commonProps,
    },
    {
      field: "description",
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
      flex: 0.2,
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
          console.log(currentRow);
          Swal.fire({
            title: 'Estas seguro?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'primary',
            cancelButtonColor: 'secondary',
            confirmButtonText: 'Si, Borrar!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              deleteDoc(currentRow.documentConfigId, currentRow.id);
              Swal.fire(
                'Borrado!',
                'Se ha borrado el registro',
                'success'
              )
            }
          })
        };

        return (
          <Stack direction="row">
            <RenderEditButton onClick={onEdit} />
            {<RenderDeleteButton onClick={onDelete} /> }
          </Stack>
        );
      },
    },
  ];

  const [openDialog, setOpenDialog] = useState(false);
  const rows = useSelector(selectAllParameters);
  const error = useSelector((state: RootState) => state.docsList.error);
  const loading = useSelector((state: RootState) => state.docsList.isLoading);
  const [formInitialValues, setFormInitialValues] = useState(initialValues);
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(resetParametersState());
    if (
      parametersId !== null &&
      parametersId !== undefined &&
      parametersId !== 0
    )
      dispatch(getParameters());
  }, [parametersGrid, dispatch]);

  async function deleteDoc(configTypeId: number, id: number) {
    try {
      await dispatch(deleteParamteres({ parametersConfigId: configTypeId, id: id }));
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Ocurrió un error eliminando el parametro",
        showConfirmButton: false,
        timer: 1500,
      });
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
         dispatch(
          updateParametersItem({
            parametersId: formValues.parametersId,
            id: formValues.id,
            data: formValues,
          })
        )
          .unwrap()
          .then((res: any) => {
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
        formValues.parametersConfigId = parametersId || 0;
        await dispatch(createParameters(formValues))
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
        rowId="id"
        buttonTitle="crear Parametro"
        external={true}
        handleClick={_handleClick}
        disabledButton={
          parametersId !== undefined && parametersId !== 0 ? false : true
        }
      />
      <FormDialog
        open={openDialog}
        title="Crear parametro"
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
                label="id"
                name="Id"
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

export default parametersGrid;
function setEditMode(arg0: boolean) {
  throw new Error("Function not implemented.");
}

function setFormInitialValues(initialValues: any) {
  throw new Error("Function not implemented.");
}

function setOpenDialog(arg0: boolean) {
  throw new Error("Function not implemented.");
}

function dispatch(arg0: AsyncThunkAction<Parameter, Parameter, { state?: unknown; dispatch?: Dispatch<AnyAction> | undefined; extra?: unknown; rejectValue?: unknown; serializedErrorType?: unknown; pendingMeta?: unknown; fulfilledMeta?: unknown; rejectedMeta?: unknown; }>) {
  throw new Error("Function not implemented.");
}

function deleteParamteres(arg0: { parametersConfigId: number; id: number; }): any {
  throw new Error("Function not implemented.");
}

function resetParametersState(): any {
  throw new Error("Function not implemented.");
}

function updateParametersItem(arg0: { parametersId: any; id: any; data: any; }): any {
  throw new Error("Function not implemented.");
}

function selectAllParameters(state: unknown): unknown {
  throw new Error("Function not implemented.");
}

