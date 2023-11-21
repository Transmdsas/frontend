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
import { Form } from "formik";
import { createInsurance } from "../../../store/vehicles/vehicleInsuranceSlice";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { InputsDivider } from "../../../components/InputsDivider";

const initialValues = {
  insuranceCompanyId: "",
  dueDate: "",
  insuranceNumber: "",
  insuranceValue: "",
  observations: "",
  evidence: "",
};

const validationSchema = Yup.object().shape({
  insuranceCompanyId: Yup.string().required(
    "Debe seleccionar la compañia aseguradora"
  ),
  dueDate: Yup.date()
    .nullable()
    .typeError("Fecha Inválida")
    .required("Debe seleccionar la fecha de vencimiento"),
  insuranceNumber: Yup.string().required("El número de seguro es requerido"),
  insuranceValue: Yup.number().nullable(),
  observations: Yup.string().nullable(),
  evidence: Yup.mixed().required("Debe cargar evidencia del seguro"),
});

export const VehicleSoatForm = ({
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
      } catch (err: any) {
        throw err;
      }
    },
    [dispatch]
  );

  const handleSubmit = async (formValues: any, actions: any) => {
    try {
        formValues.carPlate = carPlate;
        await saveInsurance(formValues);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "SOAT creado con exito",
          showConfirmButton: false,
          timer: 2000,
        });
        onSuccessSave();
    } catch (err) {
      Swal.fire({
        position: "center",
        icon: "error",
        title:
          "Ocurrió un error registrando el SOAT del vehículo",
        text: error ? error : "",
        showConfirmButton: false,
        timer: 3000,
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
        SOAT
      </Typography>
      <FormContainer
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        render={(formikProps) => (
          <Form onSubmit={formikProps.handleSubmit}>
            <Grid
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
                label="Aseguradora"
                name="insuranceCompanyId"
                parameterid={11}
                lg={4}
              />
              <CalendarField
                label="Fecha de vencimiento"
                name="dueDate"
                minDate={new Date()}
                lg={4}
              />
              <InputField
                label="Valor de la póliza"
                name="insuranceValue"
                type={"number"}
                lg={4}
              />
              <InputField
                label="Número de la póliza"
                name="insuranceNumber"
                type={"text"}
                lg={4}
              />
              <UploadButton label="Cargue SOAT" name="evidence" lg={4} />
              <InputField
                label="Observaciones"
                name="observations"
                type={"text"}
                md={12}
                lg={12}
                multiline
                rows={3}
              />
            </Grid>
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
      ></FormContainer>
    </React.Fragment>
  );
};
