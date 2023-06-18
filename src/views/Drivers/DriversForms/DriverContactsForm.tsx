import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ContactFormProps } from "./types";
import { AppDispatch } from "../../../store";
import {
  DropdownField,
  FormContainer,
  InputField,
} from "../../../components/forms";
import { Form } from "formik";
import { Button, Grid, IconButton, Stack } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

const initialValues = {
  contacts: [{ fullName: "", cellphone: "", relationshipId: "" }],
};

const validationSchema = Yup.object().shape({
  contacts: Yup.array().of(
    Yup.object().shape({
      fullName: Yup.string().required("El nombre del contacto es requerido"),
      cellphone: Yup.string().required("El teléfono del contacto es requerido"),
      relationshipId: Yup.string().required(
        "El tipo de relación/parentesco es requerido"
      ),
    })
  ),
});

const DriverContactsForm = ({ driverId, onCancel }: ContactFormProps) => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (formValues: any, actions: any) => {
    // onSubmit({ ...formValues }, actions);
    // actions.setTouched({});
    // actions.setSubmitting(false);
  };

  const handleAddContact = () => {
    setValues((prevValues) => ({
      ...prevValues,
      contacts: [
        ...prevValues.contacts,
        { fullName: "", cellphone: "", relationshipId: "" },
      ],
    }));
  };

  const handleRemoveContact = (index: number) => {
    setValues((prevValues) => ({
      ...prevValues,
      contacts: prevValues.contacts.filter((_, i) => i !== index),
    }));
  };

  const [values, setValues] = useState(initialValues);

  return (
    <React.Fragment>
      <FormContainer
        initialValues={values}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        render={(formikProps) => (
          <Form onSubmit={formikProps.handleSubmit}>
            {values.contacts.map((contact, index) => (
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
                <InputField
                  label="Nombre del Contacto"
                  name={`contacts.${index}.fullName`}
                  type="text"
                  md={4}
                  lg={4}
                />
                <InputField
                  label="Teléfono del Contacto"
                  name={`contacts.${index}.cellphone`}
                  type="text"
                  md={4}
                  lg={4}
                />
                <DropdownField
                  label="Relación / Parentesco"
                  name={`contacts.${index}.relationshipId`}
                  parameterid={17}
                />
                {index > 0 && (
                  <IconButton
                    color="secondary"
                    onClick={() => handleRemoveContact(index)}
                    sx={{
                      fontSize: "2rem",
                      alignItems: "end",
                      pb: "0.75rem",
                      pl: "1rem",
                      "&.MuiButtonBase-root:hover": {
                        bgcolor: "transparent",
                        transform: "scale(1.2)",
                      }
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
                onClick={handleAddContact}
                startIcon={<Add />}
                sx={{ mt: 2 }}
              >
                Agregar Contacto
              </Button>
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
      />
    </React.Fragment>
  );
};

export default DriverContactsForm;
