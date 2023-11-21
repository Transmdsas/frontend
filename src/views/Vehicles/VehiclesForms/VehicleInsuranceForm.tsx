import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { DetailFormProps } from "./types";
import { AppDispatch, RootState } from "../../../store";
import {
  DropdownField,
  FormContainer,
  InputField,
  CalendarField,
  UploadButton,
} from "../../../components/forms";
import { FieldArray, Form } from "formik";
import { createInsurance } from "../../../store/vehicles/vehicleInsuranceSlice";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";
import { Button, Grid, IconButton, Stack, Typography } from "@mui/material";
import { InputsDivider } from "../../../components/InputsDivider";
import { Delete } from "@mui/icons-material";

const initialValues = {
  insurances: [
    {
      insuranceTypeId: "",
      insuranceNumber: "",
      dueDate: "",
      insuranceCompanyId: "",
      insuredValue: "",
      observations: "",
      evidence: "",
    },
  ],
};

const validationSchema = Yup.object().shape({
  insurances: Yup.array().of(
    Yup.object().shape({
      insuranceTypeId: Yup.string().required(
        "Debe seleccionar el tipo de seguro"
      ),
      insuranceNumber: Yup.string().required(
        "El número de seguro es requerido"
      ),
      dueDate: Yup.date()
        .nullable()
        .typeError("Fecha Inválida")
        .required("Debe seleccionar la fecha de vencimiento"),
      insuranceCompanyId: Yup.string().required(
        "Debe seleccionar la compañia aseguradora"
      ),
      insuredValue: Yup.number().required("Debe ingresar el valor asegurado"),
      observations: Yup.string().nullable(),
      evidence: Yup.mixed().required("Debe cargar evidencia del seguro"),
    })
  ),
});

export const VehicleInsuranceForm = ({
  carPlate,
  onSuccessSave,
  onCancel,
}: DetailFormProps) => {
  const loading = useSelector(
    (state: RootState) => state.vehicleInsurances.isLoading
  );
  const error = useSelector(
    (state: RootState) => state.vehicleInsurances.error
  );
  const dispatch = useDispatch<AppDispatch>();

  const saveInsurance = useCallback(
    async (insurance: any) => {
      try {
        await dispatch(createInsurance(insurance))
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
        text: "¿Estás seguro de que deseas crear la(s) póliza(s)?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "Cancelar",
      });

      if (confirmed.isConfirmed) {
        for (const insurance of formValues["insurances"]) {
          insurance.carPlate = carPlate;
          await saveInsurance(insurance);
        }
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Pólizas creadas con exito",
          showConfirmButton: false,
          timer: 2000,
        });
        onSuccessSave();
      }
    } catch (err) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Ocurrió un error creando pólizas del vehículo",
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
      <InputsDivider marginBottom={1} />
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          color: "gray",
          mt: 0,
          mb: 1,
        }}
      >
        Otras Pólizas
      </Typography>
      <FormContainer
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        render={(formikProps) => (
          <Form onSubmit={formikProps.handleSubmit}>
            <FieldArray
              name="insurances"
              render={(arrayHelpers) => (
                <React.Fragment>
                  {formikProps.values.insurances.map((insurance, index) => (
                    <Grid
                      key={index}
                      container
                      rowSpacing={4}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      sx={{
                        p: 2,
                        mt: 1,
                        justifyContent: "initial",
                      }}
                    >
                      <DropdownField
                        label="Tipo de Póliza"
                        name={`insurances.${index}.insuranceTypeId`}
                        parameterid={10}
                        lg={4}
                      />
                      <InputField
                        label="Número de la póliza"
                        name={`insurances.${index}.insuranceNumber`}
                        type={"text"}
                        lg={4}
                      />
                      <CalendarField
                        label="Fecha de vencimiento"
                        name={`insurances.${index}.dueDate`}
                        minDate={new Date()}
                        lg={4}
                      />
                      <DropdownField
                        label="Aseguradora"
                        name={`insurances.${index}.insuranceCompanyId`}
                        parameterid={11}
                        lg={4}
                      />
                      <InputField
                        label="Valor asegurado"
                        name={`insurances.${index}.insuredValue`}
                        type={"number"}
                        lg={4}
                      />
                      <UploadButton
                        label="Cargue Póliza"
                        name={`insurances.${index}.evidence`}
                        lg={4}
                      />
                      <InputField
                        label="Observaciones"
                        name={`insurances.${index}.observations`}
                        type={"text"}
                        md={12}
                        lg={12}
                        multiline
                        rows={3}
                      />

                      {index > 0 && (
                        <IconButton
                          color="secondary"
                          onClick={() => {
                            arrayHelpers.remove(index);
                          }}
                          sx={{
                            fontSize: "2rem",
                            alignItems: "end",
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
                      <InputsDivider marginBottom={1} />
                    </Grid>
                  ))}
                  <Grid
                    item
                    xs={12}
                    alignContent={"left"}
                    mb={3}
                    sx={{
                      p: 2,
                      justifyContent: "initial",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        arrayHelpers.push({
                          insuranceTypeId: "",
                          insuranceNumber: "",
                          dueDate: "",
                          insuranceCompanyId: "",
                          insuredValue: "",
                          observations: "",
                          evidence: "",
                        });
                      }}
                      //   startIcon={<Add />}
                      sx={{ mt: 2, borderRadius: 20 }}
                    >
                      Agregar otra póliza
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
