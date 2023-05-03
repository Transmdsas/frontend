import React from "react";
import {
  DropdownField,
  CalendarField,
  UploadButton,
  FormContainer,
} from "../../../components/forms";
import formInitialValues from "../FormModel/formInitialValues";
import validationSchema from "../FormModel/validationSchema";
import { Form } from "formik";
import { Button, Grid, Stack } from "@mui/material";
import { ContractFormProps } from "./types";

export const ContractForm = ({ formField, onSubmit, onCancel }: ContractFormProps<any>) => {
  const { contractTypeId, contractDueDate, contractFile } = formField;

  const handleSubmit = (formValues: any, actions: any) => {
    actions.setTouched({});
    actions.setSubmitting(false);
    onSubmit({...formValues}, actions);
    //actions.resetForm();
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <React.Fragment>
      <FormContainer
        initialValues={formInitialValues}
        validationSchema={validationSchema[1]}
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
              <DropdownField
                name={contractTypeId.name}
                label={contractTypeId.label}
                parameterid={14}
              />
              <CalendarField
                label={contractDueDate.label}
                name={contractDueDate.name}
                minDate={new Date()}
              />
              <UploadButton name={contractFile.name} />
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
                    handleCancel();
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
