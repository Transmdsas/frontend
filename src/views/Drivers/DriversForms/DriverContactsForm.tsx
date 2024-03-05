import React, { useEffect, useState } from "react";
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
import {
  createContact,
  deleteContact,
  getDriverContacts,
  updateContact,
} from "../../../store/drivers/driverContactSlice";
import useAlerts from "../../../hooks/useAlerts";
import Loading from "../../../components/Loading";
import { DriverContact } from "../../../store/drivers/types";

const initialFormValues: { contacts: DriverContact[] } = {
  contacts: [],
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
  isEditMode,
}: ContactFormProps) => {
  const {
    successMessage,
    errorMessage,
    showConfirmation,
    showSuccess,
    showError,
  } = useAlerts();
  const loading = useSelector(
    (state: RootState) => state.driverContacts.isLoading
  );
  const [initialValues, setInitialValues] = useState(initialFormValues);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isEditMode) {
      dispatch(getDriverContacts(driverId))
        .unwrap()
        .then((res) => {
          if (res.length > 0) setInitialValues({ contacts: res });
        })
        .catch((err: any) => {
          errorMessage(
            "Ocurrió un error consultando los contactos del conductor",
            err.message
          );
          console.error(err);
        });
    }
  }, [dispatch, driverId, errorMessage, isEditMode]);

  const saveContact = async (contact: any) => {
    try {
      const modifiedContact = { ...contact };

      if (modifiedContact.id) {
        delete modifiedContact.relationship;
      }

      const action = modifiedContact.id
        ? updateContact({
            driverId: modifiedContact.driverId,
            contactId: modifiedContact.id,
            data: modifiedContact,
          })
        : createContact(modifiedContact);

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
          const updatedContacts = formValues.contacts.map((contact: any) => ({
            ...contact,
            driverId: driverId,
          }));
          for (let contact of updatedContacts) {
            await saveContact(contact);
          }
          successMessage("Contactos actualizados correctamente");
          onSuccessSave();
        } catch (err: any) {
          errorMessage(
            "Ocurrió un error actualizando los contactos del conductor",
            err.message
          );
          console.error(err);
        }
      },
      "Confirmar acción",
      `¿Estás seguro de que deseas ${isEditMode ? 'editar': 'crear'} los contactos?`,
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
              name="contacts"
              render={(arrayHelpers) => (
                <React.Fragment>
                  {formikProps.values.contacts.map(
                    (contact: any, index: number) => (
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
                        {(index > 0 || contact.id) && (
                          <IconButton
                            color="secondary"
                            onClick={() => {
                              showConfirmation(async () => {
                                if (isEditMode && contact.id) {
                                  await dispatch(
                                    deleteContact({
                                      driverId: contact.driverId,
                                      contactId: contact.id,
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
                                }else {
                                  arrayHelpers.remove(index);
                                }
                              });
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
                    )
                  )}

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
