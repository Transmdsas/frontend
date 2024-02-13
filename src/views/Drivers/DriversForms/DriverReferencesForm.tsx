import React, { useCallback } from "react";
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
import { createReference } from "../../../store/drivers/driverReferenceSlice";
import Swal from "sweetalert2";

const initialValues = {
  references: [
    { referenceTypeId: "", fullName: "", cellphone: "", relationshipId: "" },
  ],
};

const validationSchema = Yup.object().shape({
  references: Yup.array().of(
    Yup.object().shape({
      referenceTypeId: Yup.string().required(
        "El tipo de referencia es requerido"
      ),
      fullName: Yup.string().required("El nombre del contacto es requerido"),
      cellphone: Yup.string().required("El teléfono del contacto es requerido"),
      relationshipId: Yup.string().required(
        "El tipo de relación/parentesco es requerido"
      ),
    })
  ),
});

const DriverReferencesForm = ({
  driverId,
  onCancel,
  onSuccessSave }: ReferencesFormProps) => {
  const loading = useSelector(
    (state: RootState) => state.driverReferences.isLoading
  );
  const error = useSelector((state: RootState) => state.driverReferences.error);
  const dispatch = useDispatch<AppDispatch>();

  const saveReference = useCallback(
    async (reference: any) => {
      try {
        await dispatch(createReference(reference))
          .unwrap()
          .then((res) => {
            console.log(res);
          });
      } catch (error) {
        throw error;
      }
    },
    [dispatch]
  );

  const handleSubmit = async (formValues: any, actions: any) => {
    try {
      const confirmed = await Swal.fire({
        title: "Confirmar acción",
        text: "¿Estás seguro de que deseas crear la(s) referencia(s)?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "Cancelar",
      });

      if (confirmed.isConfirmed) {
        for (const reference of formValues["references"]) {
          reference.driverId = driverId;
          await saveReference(reference);
        }
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Referencias creadas con exito",
          showConfirmButton: false,
          timer: 2000,
        });
        onSuccessSave();
      }
    } catch (err) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Ocurrió un error creando referencias del conductor",
        text: error ? error : "",
        showConfirmButton: false,
        timer: 1500,
      });
    }
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
                      <DropdownField
                        label="Relación / Parentesco"
                        name={`references.${index}.relationshipId`}
                        parameterid={17}
                        md={5.5}
                        lg={5.5}
                      />
                      {index > 0 && (
                        <IconButton
                          color="secondary"
                          onClick={() => {
                            arrayHelpers.remove(index);
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
                          relationshipId: "",
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
