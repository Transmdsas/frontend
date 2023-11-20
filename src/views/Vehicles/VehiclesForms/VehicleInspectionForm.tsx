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
import { createInspection } from "../../../store/vehicles/vehicleInspectionSlice";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";
import { Button, Grid, Stack } from "@mui/material";

const initialValues = {
  controlNumber: "",
  runtNumber: "",
  dueDate: "",
  diagnosticCenterId: "",
  observations: "",
  evidence: "",
};

const validationSchema = Yup.object().shape({
  controlNumber: Yup.string().required("Debe ingresar el número de control"),
  runtNumber: Yup.string().required(
    "Debe ingresar el número de consecutivo RUNT"
  ),
  dueDate: Yup.date()
    .nullable()
    .typeError("Fecha Inválida")
    .required("Debe seleccionar la fecha de vencimiento"),
  diagnosticCenterId: Yup.string().required(
    "Debe seleccionar el centro de diagnostico"
  ),
  observations: Yup.string().nullable(),
  evidence: Yup.mixed().required("Debe cargar evidencia de la revisión"),
});

export const VehicleInspectionForm = ({
  carPlate,
  onCancel,
  onSuccessSave,
}: DetailFormProps) => {
  const loading = useSelector(
    (state: RootState) => state.vehicleInspections.isLoading
  );
  const error = useSelector(
    (state: RootState) => state.vehicleInspections.error
  );
  const dispatch = useDispatch<AppDispatch>();

  const saveInspection = useCallback(
    async (inspection: any) => {
      try {
        await dispatch(createInspection(inspection))
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
      const confirmed = await Swal.fire({
        title: "Confirmar acción",
        text: "¿Estás seguro de que desea agregar la revisión?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "Cancelar",
      });

      if (confirmed.isConfirmed) {
        formValues.carPlate = carPlate;
        await saveInspection(formValues);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Revisión creada con exito",
          showConfirmButton: false,
          timer: 2000,
        });
        onSuccessSave();
      }
    } catch (err) {
      Swal.fire({
        position: "center",
        icon: "error",
        title:
          "Ocurrió un error creando la revisión técnico mecánica del vehículo",
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
                mt: 3,
                mb: 3,
                justifyContent: "space-evenly",
              }}
            >
              <InputField
                label="Número de Control"
                name="controlNumber"
                type={"text"}
                md={4}
                lg={4}
              />
              <InputField
                label="Número de consecutivo RUNT"
                name="runtNumber"
                type={"text"}
                md={6}
                lg={6}
              />
              <CalendarField
                label="Fecha de vencimiento"
                name="dueDate"
                minDate={new Date()}
                md={4}
                lg={4}
              />
              <DropdownField
                label="Centro de diagnóstico Automotriz"
                name="diagnosticCenterId"
                parameterid={12}
                md={6}
                lg={6}
              />
               <UploadButton
                label="Evidencia de la revisión"
                name="evidence"
                md={4}
                lg={4}
              />
              <InputField
                label="Observaciones"
                name="observations"
                type={"text"}
                md={6}
                lg={6}
                multiline
                rows={3}
              />
             
            </Grid>
            <Grid item xs={12} alignContent={"rigth"}>
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
