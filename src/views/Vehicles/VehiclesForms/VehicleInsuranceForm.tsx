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
import { Button, Grid, Stack, Typography } from "@mui/material";
import { InputsDivider } from "../../../components/InputsDivider";

const initialValues = {
  insurances: [
    {
      insuranceCompanyId: "",
      dueDate: "",
      insuranceNumber: "",
      insuranceValue: "",
      insuranceTypeId: "",
      insuredValue: "",
      observations: "",
      evidence: "",
    },
  ],
};

const validationSchema = Yup.object().shape({
  insurances: Yup.array().of(
    Yup.object().shape({
      insuranceCompanyId: Yup.string().required(
        "Debe seleccionar la compañia aseguradora"
      ),
      dueDate: Yup.date()
        .nullable()
        .typeError("Fecha Inválida")
        .required("Debe seleccionar la fecha de vencimiento"),
      insuranceNumber: Yup.string().required(
        "El número de seguro es requerido"
      ),
      insuranceValue: Yup.number().nullable(),
      insuranceTypeId: Yup.string().nullable(),
      insuredValue: Yup.number().nullable(),
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
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = () => {};

  return (
    <React.Fragment>
      {/* {loading && <Loading />} */}
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
              />
              <CalendarField
                label="Fecha de vencimiento"
                name="dueDate"
                minDate={new Date()}
              />
              <InputField
                label="Valor de la póliza"
                name="insuranceValue"
                type={"number"}
              />
              <InputField
                label="Número de la póliza"
                name="insuranceNumber"
                type={"text"}
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
              <UploadButton
                label="Cargue SOAT"
                name="evidence"
              />
            </Grid>
          </Form>
        )}
      ></FormContainer>
    </React.Fragment>
  );
};
