import React, { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import { Alert, Button, Grid, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { PageTitle } from "../../../components/PageTitle";
import parametersConfigModel from "../FormModel/parametersConfigFormModel";
import configFormInitialValues from "../FormModel/pamatersFormInitialValues";
import validationConfigSchema from "./../FormModel/validationConfigSchema";
import DocsConfigForm, { ParametersConfigForm } from "../ParametersConfigForms/ParametersConfigForm";
import ParametersGrid from "../ParametersConfigGrid/ParametersListGrid";
import { AppDispatch, RootState } from "./../../../store";
import {
  createDocsConfig,
  getDocsConfigById,
  clearCreatedRecordId,
  selectDocConfigById,
  updateDocsConfig,
} from "./../../../store/docsConfig/docConfigSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";

const { formId, formField } = parametersConfigModel;

export const ParametersConfigFormPage = () => {
  const { configId } = useParams();
  const [parametersId, setparametersId] = useState<number | null>(0);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<any>(
    configFormInitialValues
  );
  const loading = useSelector((state: RootState) => state.parameters.isLoading);
  const error = useSelector((state: RootState) => state.parameters.error);
  const selectedDocConfig = useSelector((state: RootState) =>
    selectDocConfigById(state, Number(configId))
  );
  const createdRecordId = useSelector(
    (state: RootState) => state.docsConfig.createdRecordId
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    async function getEditData(configId: number) {
      await dispatch(getDocsConfigById(configId));
    }

    if (configId) {
      getEditData(Number(configId));
    }

    if (createdRecordId !== null) {
      setparametersId(createdRecordId);
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
  }, [createdRecordId, configId, dispatch]);

  useEffect(() => {
    if (selectedDocConfig) {
      setInitialValues({ ...selectedDocConfig });
      setEditMode(true);
      setparametersId(selectedDocConfig.id);
    }
  }, [selectedDocConfig]);

  const _handleSubmit = async (values: any, actions: any) => {
    if (editMode) {
      console.log(values);
      try {
        await dispatch(
          updateDocsConfig({
            id: values.id,
            data: {
              id: values.id,
              description: values.description,
              isActive: values.isActive,
              createdAt: values.createdAt,
              updatedAt: values.updatedAt
            },
          })
        )
          .unwrap()
          .then((res) => {
            console.log(res);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Configuración Actualizada con exito",
              showConfirmButton: false,
              timer: 2000,
            });
          });
      } catch (error) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Ocurrió un error actualizando el registro",
          showConfirmButton: false,
          timer: 1500,
        });
        console.error(error);
      }
    } else {
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
        console.error(error);
      }
    }
  };

  return (
    <React.Fragment>
      {loading && <Loading />}
      <PageTitle title="Crear Parametro" />
      <Formik
        initialValues={initialValues}
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
              <ParametersConfigForm formField={formField} />
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
                      setparametersId(null);
                      navigate("/configuracionDocumentos");
                    }}
                  >
                    Finalizar
                  </Button>
                </Stack>
              </Grid>
              {!parametersId && !editMode && (
                <Alert variant="filled" severity="info" sx={{ mb: 2 }}>
                  Para grabar documentos debe guardar la configuración de la
                  carga
                </Alert>
              )}
              <ParametersGrid parametersId={parametersId} />
            </Grid>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};
