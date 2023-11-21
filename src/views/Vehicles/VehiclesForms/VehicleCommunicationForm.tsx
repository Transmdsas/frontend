import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { DetailFormProps } from "./types";
import { AppDispatch, RootState } from "../../../store";
import {
  FormContainer,
  InputField,
} from "../../../components/forms";
import { Form } from "formik";
import { createCommunication } from "../../../store/vehicles/vehicleCommunicationSlice";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";
import { Button, Grid, Stack } from "@mui/material";

const initialValues = {
  webUri: "",
  user: "",
  password: "",
  otherOptions: "",
  principalPhone: "",
  secondaryPhone: "",
  observations: "",
};

const validationSchema = Yup.object().shape({
  webUri: Yup.string().required("Debe ingresar la URL de la web Satelital"),
  user: Yup.string().required("Debe ingresar el usuario para acceder a la web"),
  password: Yup.string().required("El password de ingreso es requerido"),
  otherOptions: Yup.string().nullable(),
  principalPhone: Yup.string().required("Debe ingresar el teléfono de contacto"),
  secondaryPhone: Yup.string().nullable(),
  observations: Yup.string().nullable(),
});

export const VehicleCommunicationForm = ({
  carPlate,
  onSuccessSave,
  onCancel,
}: DetailFormProps) => {
  const loading = useSelector(
    (state: RootState) => state.vehicleCommunications.isLoading
  );
  const error = useSelector(
    (state: RootState) => state.vehicleCommunications.error
  );
  const dispatch = useDispatch<AppDispatch>();

  const saveCommunication = useCallback(
    async (communication: any) => {
      try {
        await dispatch(createCommunication(communication))
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
        await saveCommunication(formValues);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Equipo de comunicaciones creado con exito",
          showConfirmButton: false,
          timer: 2000,
        });
        onSuccessSave();
    } catch (err) {
      Swal.fire({
        position: "center",
        icon: "error",
        title:
          "Ocurrió un error registrando el equipo de comunicaciones del vehículo",
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
              columnSpacing={{ xs: 2, sm: 3, md: 4 }}
              sx={{
                p: 2,
                mt: 1,
                justifyContent: "initial",
              }}
            >
              <InputField
                label="Web Satelital"
                name="webUri"
                type={"text"}
                lg={4}
              />
              <InputField
                label="Usuario"
                name="user"
                type={"text"}
                lg={4}
              />
              <InputField
                label="Clave"
                name="password"
                type={"text"}
                lg={4}
              />
              <InputField
                label="Otras opciones"
                name="otherOptions"
                type={"text"}
                lg={4}
              />
              <InputField
                label="Telefono #1"
                name="principalPhone"
                type={"text"}
                lg={4}
                />
              <InputField
                label="Telefono #2"
                name="secondaryPhone"
                type={"text"}
                lg={4}
              />
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
