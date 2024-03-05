import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { ReferencesFormProps } from "./types";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import {
  DropdownField,
  FormContainer,
  InputField,
} from "../../../components/forms";
import { FieldArray, Form } from "formik";
import { Button, Grid, IconButton, Stack } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import {
  createReference,
  deleteReference,
  getDriverReferences,
  updateReference,
} from "../../../store/drivers/driverReferenceSlice";
import useAlerts from "../../../hooks/useAlerts";
import { DriverReference } from "../../../store/drivers/types";

const initialFormValues: { references: DriverReference[] } = {
  references: [],
};

const validationSchema = Yup.object().shape({
  references: Yup.array().of(
    Yup.object().shape({
      referenceTypeId: Yup.string().required(
        "El tipo de referencia es requerido"
      ),
      fullName: Yup.string().required("El nombre del contacto es requerido"),
      cellphone: Yup.string().required("El teléfono del contacto es requerido"),
      relationship: Yup.string().required(
        "El tipo de relación/parentesco es requerido"
      ),
    })
  ),
});

const DriverReferencesForm = ({
  driverId,
  onCancel,
  onSuccessSave,
  isEditMode,
}: ReferencesFormProps) => {
  const {
    successMessage,
    errorMessage,
    showConfirmation,
    showSuccess,
    showError,
  } = useAlerts();
  const loading = useSelector(
    (state: RootState) => state.driverReferences.isLoading
  );
  const [initialValues, setInitialValues] = useState(initialFormValues);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isEditMode) {
      dispatch(getDriverReferences(driverId))
        .unwrap()
        .then((res) => {
          if (res.length > 0) setInitialValues({ references: res });
        })
        .catch((err: any) => {
          errorMessage(
            "Ocurrió un error consultando las referencias del conductor",
            err.message
          );
          console.error(err);
        });
    }
  }, [dispatch, driverId, errorMessage, isEditMode]);

  const saveReference = async (reference: any) => {
    try {
      const modifiedReference = { ...reference};

      if (modifiedReference.id) {
        delete modifiedReference.referenceType;
      }

      const action = reference.id
        ? updateReference({
            driverId: modifiedReference.driverId,
            referenceId: modifiedReference.id,
            data: modifiedReference,
          })
        : createReference(reference);

      const res = await dispatch(action).unwrap();
      return res;
    } catch (err: any) {
      throw err;
    }
  };

  const handleSubmit = async (formValues: any, actions: any) => {
    showConfirmation(
      async () => {
        try {
          const updatedReferences = formValues.references.map(
            (reference: any) => ({
              ...reference,
              driverId: driverId,
            })
          );
          for (let reference of updatedReferences) {
            await saveReference(reference);
          }
          successMessage("Referencias actualizadas correctamente");
          onSuccessSave();
        } catch (err: any) {
          errorMessage(
            "Ocurrió un error actualizando las referencias del conductor",
            err.message
          );
          console.error(err);
        }
      },
      "Confirmar acción",
      `¿Estás seguro de que deseas ${
        isEditMode ? "editar" : "crear"
      } las referencias?`,
      "question"
    );
    actions.setTouched({});
    actions.setSubmitting(false);
  };

  return (
    <React.Fragment>
      {loading && <Loading />}
      <FormContainer
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        render={(formikProps) => (
          <Form onSubmit={formikProps.handleSubmit}>
            <FieldArray
              name="references"
              render={(arrayHelpers) => (
                <React.Fragment>
                  {formikProps.values.references.map((reference, index) => (
                    <Grid
                      key={index}
                      container
                      rowSpacing={4}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      sx={{
                        p: 2,
                        pl: "10%",
                        mt: 1,
                        // justifyContent: "space-around",
                      }}
                    >
                      <DropdownField
                        label="Tipo de Referencia"
                        name={`references.${index}.referenceTypeId`}
                        parameterid={16}
                        md={5.5}
                        lg={5.5}
                      />
                      <InputField
                        label="Nombre de la Referencia"
                        name={`references.${index}.fullName`}
                        type="text"
                        md={5.5}
                        lg={5.5}
                      />
                      <InputField
                        label="Teléfono de la Referencia"
                        name={`references.${index}.cellphone`}
                        type="text"
                        md={5.5}
                        lg={5.5}
                      />
                      <InputField
                        label="Relación / Parentesco"
                        name={`references.${index}.relationship`}
                        md={5.5}
                        lg={5.5}
                      />
                      {(index > 0 || reference.id) && (
                        <IconButton
                          color="secondary"
                          onClick={() => {
                            showConfirmation(async () => {
                              if (isEditMode && reference.id) {
                                await dispatch(
                                  deleteReference({
                                    driverId: reference.driverId,
                                    referenceId: reference.id,
                                  })
                                )
                                  .unwrap()
                                  .then((res) => {
                                    showSuccess("Se ha borrado el registro");
                                    arrayHelpers.remove(index);
                                  })
                                  .catch((err) => {
                                    console.error(err);
                                    showError(err.message);
                                  });
                              }else{
                                arrayHelpers.remove(index);
                              }
                            });
                          }}
                          sx={{
                            fontSize: "2rem",
                            alignItems: "flex-start",
                            pb: "0.75rem",
                            pl: "1rem",
                            "&.MuiButtonBase-root:hover": {
                              bgcolor: "transparent",
                              transform: "scale(1.2)",
                            },
                          }}
                        >
                          <Delete fontSize="inherit" />
                        </IconButton>
                      )}
                    </Grid>
                  ))}
                  <Grid item xs={12} alignContent={"left"} mb={3}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        arrayHelpers.push({
                          referenceTypeId: "",
                          fullName: "",
                          cellphone: "",
                          relationship: "",
                        });
                      }}
                      startIcon={<Add />}
                      sx={{ mt: 2 }}
                    >
                      Agregar Contacto
                    </Button>
                  </Grid>
                </React.Fragment>
              )}
            />
            <Grid item xs={12} alignContent={"right"}>
              <Stack direction="row" justifyContent="end">
                <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  sx={{ mr: 4 }}
                  onClick={() => {
                    formikProps.resetForm();
                    onCancel();
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  disabled={formikProps.isSubmitting}
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mr: 2 }}
                >
                  Guardar
                </Button>
              </Stack>
            </Grid>
          </Form>
        )}
      />
    </React.Fragment>
  );
};

export default DriverReferencesForm;
