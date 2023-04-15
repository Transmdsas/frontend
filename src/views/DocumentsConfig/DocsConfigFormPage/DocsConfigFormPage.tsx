import React, { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import { Alert, Button, Grid, Stack } from "@mui/material";
import { useNavigate  } from "react-router-dom";
import { PageTitle } from "../../../components/PageTitle";
import docsConfigFormModel from "./../FormModel/docsConfigFormModel";
import configFormInitialValues from "./../FormModel/configFormInitialValues";
import validationConfigSchema from "./../FormModel/validationConfigSchema";
import DocsConfigForm from "../DocsConfigForms/DocsConfigForm";
import DocsListGrid from "../DocsConfigGrid/DocsListGrid";
import { AppDispatch, RootState } from "./../../../store";
import {
  createDocsConfig,
  clearCreatedRecordId,
} from "./../../../store/docsConfig/docConfigSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";

const { formId, formField } = docsConfigFormModel;

export const DocsConfigFormPage = () => {
  const [docsConfigId, setDocsConfigId] = useState<number | null>(0);
  const loading = useSelector((state: RootState) => state.docsConfig.isLoading);
  const error = useSelector((state: RootState) => state.docsConfig.error);
  const createdRecordId = useSelector(
    (state: RootState) => state.docsConfig.createdRecordId
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (createdRecordId !== null) {
      console.log("createdRecordId", createdRecordId);
      setDocsConfigId(createdRecordId);
      dispatch(clearCreatedRecordId());
      Swal.fire({
        position: "center",
        icon: "success",
        title:
          "Configuración guardada con exito, puede crear la lista de documentos",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }, [createdRecordId, dispatch]);

  async function _handleSubmit(values: any, actions: any) {
    try {
      if (values.referenceCodeId === "") {
        delete values.referenceCodeId;
      }

      await dispatch(createDocsConfig(values));

      if (error) throw new Error(error);

      actions.setTouched({});
      actions.setSubmitting(false);
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Ocurrió un error creando el registro",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  }

  return (
    <React.Fragment>
      {loading && <Loading />}
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
                    disabled={props.isSubmitting}
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mr: 2 }}
                  >
                    Guardar
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ mr: 4 }}
                    onClick={() => {
                      props.resetForm();
                      setDocsConfigId(null);
                      navigate('/configuracionDocumentos');
                    }}
                  >
                    Finalizar
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
