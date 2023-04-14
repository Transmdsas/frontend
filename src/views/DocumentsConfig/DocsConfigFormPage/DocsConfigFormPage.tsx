import React from "react";
import { Form, Formik } from "formik";
import { Button, Grid, Stack } from "@mui/material";
import { PageTitle } from "../../../components/PageTitle";
import docsConfigFormModel from "./../FormModel/docsConfigFormModel";
import configFormInitialValues from "./../FormModel/configFormInitialValues";
import validationConfigSchema from "./../FormModel/validationConfigSchema";
import DocsConfigForm from "../DocsConfigForms/DocsConfigForm";
import { DocsConfigGrid } from "../DocsConfigGrid/DocsConfigGrid";

const { formId, formField } = docsConfigFormModel;

async function _handleSubmit(values: any, actions: any) {
  alert(values.configTypeId);
  alert(values.referenceCodeId);
  alert(values.isActive);

  actions.setSubmitting(false);
  actions.setTouched({});
}

export const DocsConfigFormPage = () => {
  return (
    <React.Fragment>
      <PageTitle title="Configurar carga de documentos" />
      <Formik
        initialValues={configFormInitialValues}
        validationSchema={validationConfigSchema[0]}
        onSubmit={_handleSubmit}
        enableReinitialize={true}
      >
        {(props) => (
          <Form id={formId}>
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
              <DocsConfigForm formField={formField} />
              <Grid item xs={12} alignContent={"rigth"} sx={{ mb: 2 }}>
                <Stack direction="row" justifyContent="end">
                  <Button
                    //onClick={_handleBack}
                    variant="contained"
                    color="secondary"
                    sx={{ mr: 4 }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    disabled={props.isSubmitting}
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mr: 2 }}
                  >
                    Guardar
                  </Button>
                </Stack>
              </Grid>
              <DocsConfigGrid />
            </Grid>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};
