import React, { useState } from "react";
import { Form, Formik } from "formik";
import { Alert, Button, Grid, Stack } from "@mui/material";
import { PageTitle } from "../../../components/PageTitle";
import docsConfigFormModel from "./../FormModel/docsConfigFormModel";
import configFormInitialValues from "./../FormModel/configFormInitialValues";
import validationConfigSchema from "./../FormModel/validationConfigSchema";
import DocsConfigForm from "../DocsConfigForms/DocsConfigForm";
import DocsListGrid from "../DocsConfigGrid/DocsListGrid";

const { formId, formField } = docsConfigFormModel;

export const DocsConfigFormPage = () => {
  const [docsConfigId, setDocsConfigId] = useState(0);

  async function _handleSubmit(values: any, actions: any) {
    setDocsConfigId(1);

    actions.setSubmitting(false);
    actions.setTouched({});
  }

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
              {!docsConfigId && (
                <Alert variant="filled" severity="info" sx={{ mb: 2 }}>
                  Para grabar documentos debe guardar la configuración de la
                  carga
                </Alert>
              )}
              <DocsListGrid docsConfigId={docsConfigId} />
            </Grid>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};
