import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { ContactFormProps } from "./types";
import { AppDispatch, RootState } from "../../../store";
import {
  DropdownField,
  FormContainer,
  InputField,
} from "../../../components/forms";
import { FieldArray, Form } from "formik";
import { Button, Grid, IconButton, Stack } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { createContact } from "../../../store/drivers/driverContactSlice";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";

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

const DriverContactsForm = ({
  driverId,
  onCancel,
  onSuccessSave,
}: ContactFormProps) => {
  const loading = useSelector(
    (state: RootState) => state.driverContacts.isLoading
  );
  const error = useSelector((state: RootState) => state.driverContacts.error);
  const dispatch = useDispatch<AppDispatch>();

  const saveContact = useCallback(
    async (contact: any) => {
      try {
        await dispatch(createContact(contact))
          .unwrap()
          .then((res) => {
            console.log(res);
          });
      } catch (err:any) {
        throw err;
      }
    },
    [dispatch]
  );

  const handleSubmit = async (formValues: any, actions: any) => {
    try {
      const confirmed = await Swal.fire({
        title: "Confirmar acción",
        text: "¿Estás seguro de que deseas crear los contactos?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "Cancelar",
      });

      if (confirmed.isConfirmed) {
        for (const contact of formValues["contacts"]) {
          contact.driverId = driverId;
          await saveContact(contact);
        };
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Contactos creados con exito",
          showConfirmButton: false,
          timer: 2000,
        });
        onSuccessSave();
      }
    } catch (err) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Ocurrió un error creando contactos del conductor",
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
              name="contacts"
              render={(arrayHelpers) => (
                <React.Fragment>
                  {formikProps.values.contacts.map((contact, index) => (
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
                    </Grid>
                  ))}

                  <Grid item xs={12} alignContent={"left"} mb={3}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        arrayHelpers.push({
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

export default DriverContactsForm;
