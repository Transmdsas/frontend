import React, { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import { Alert, Button, Grid, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { PageTitle } from "../../../components/PageTitle";
import docsConfigFormModel from "./../FormModel/docsConfigFormModel";
import configFormInitialValues from "./../FormModel/configFormInitialValues";
import validationConfigSchema from "./../FormModel/validationConfigSchema";
import DocsConfigForm from "../DocsConfigForms/DocsConfigForm";
import DocsListGrid from "../DocsConfigGrid/DocsListGrid";
import { AppDispatch, RootState } from "./../../../store";
import {
  createDocsConfig,
  getDocsConfigById,
  clearCreatedRecordId,
  selectDocConfigById,
  updateDocsConfig,
} from "./../../../store/docsConfig/docConfigSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import useAlerts from "../../../hooks/useAlerts";

const { formId, formField } = docsConfigFormModel;

export const DocsConfigFormPage = () => {
  const { successMessage, errorMessage } = useAlerts();
  const { configId } = useParams<{ configId: string | undefined }>();
  const isEditMode = configId !== undefined;
  const [docsConfigId, setDocsConfigId] = useState<number | null>(0);
  const [saved, setSaved] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<any>(
    configFormInitialValues
  );
  const loading = useSelector((state: RootState) => state.docsConfig.isLoading);
  const error = useSelector((state: RootState) => state.docsConfig.error);
  const selectedDocConfig = useSelector((state: RootState) =>
    selectDocConfigById(state, Number(configId))
  );
  const createdRecordId = useSelector(
    (state: RootState) => state.docsConfig.createdRecordId
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  //Obteber datos para editar.
  useEffect(() => {
    async function getEditData(configId: number) {
      await dispatch(getDocsConfigById(configId));
    }
    if (configId) {
      getEditData(Number(configId));
    }
  }, [configId, dispatch]);

  useEffect(() => {
    if (createdRecordId !== null) {
      setDocsConfigId(createdRecordId);
      dispatch(clearCreatedRecordId());
      successMessage(
        "Configuración guardada con exito, puede crear la lista de documentos"
      );
    }
  }, [createdRecordId, dispatch, successMessage]);

  useEffect(() => {
    if (selectedDocConfig) {
      setInitialValues({ ...selectedDocConfig });
      setDocsConfigId(selectedDocConfig.id);
    }
  }, [selectedDocConfig]);

  const handleUpdate = async (values: any, actions: any) => {
    await dispatch(
      updateDocsConfig({
        id: values.id,
        data: {
          id: values.id,
          configTypeId: values.configTypeId,
          referenceCodeId: values.referenceCodeId,
          isActive: values.isActive,
          createdAt: values.createdAt,
          updatedAt: values.updatedAt,
        },
      })
    )
      .unwrap()
      .then((res) => {
        successMessage('"Configuración Actualizada con exito');
      })
      .catch((err) => {
        errorMessage("Ocurrió un error actualizando el registro");
        console.error(error);
      });

    actions.setTouched({});
    actions.setSubmitting(false);
  };

  const handleCreate = async (values: any, actions: any) => {
    if (values.referenceCodeId === "") {
      delete values.referenceCodeId;
    }
    await dispatch(createDocsConfig(values))
      .unwrap()
      .then((res) => {
        setSaved(true);
        successMessage('"Configuración creada con exito');
      })
      .catch((err) => {
        errorMessage(err.message);
        console.error(err);
      });
    actions.setTouched({});
    actions.setSubmitting(false);
  };

  return (
    <React.Fragment>
      {loading && <Loading />}
      <PageTitle title="Configurar carga de documentos" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationConfigSchema[0]}
        onSubmit={isEditMode ? handleUpdate : handleCreate}
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
                  {!saved && (
                    <Button
                      disabled={props.isSubmitting}
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{ mr: 2 }}
                    >
                      Guardar
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ mr: 4 }}
                    onClick={() => {
                      props.resetForm();
                      setDocsConfigId(null);
                      navigate("/configuracionDocumentos");
                    }}
                  >
                    Finalizar
                  </Button>
                </Stack>
              </Grid>
              {!docsConfigId && !isEditMode && (
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
