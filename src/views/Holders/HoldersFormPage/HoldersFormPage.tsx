import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CircularProgress, Grid, Stack } from "@mui/material";
import { Formik, Form } from "formik";
import Swal from 'sweetalert2';
import { AppDispatch, RootState } from "./../../../store";
import { createHolder } from "./../../../store/holders/holderSlice";
import { PageTitle } from "../../../components/PageTitle";
import Loading from "../../../components/Loading";
import { GeneralForm } from "../HoldersForms/GeneralForm";
import { ContractForm } from "../HoldersForms/ContractForm";
import { DocumentsForm } from "../HoldersForms/DocumentsForm";

import validationSchema from "../FormModel/validationSchema";
import holderFormModel from "../FormModel/holderFormModel";
import formInitialValues from "../FormModel/formInitialValues";
import { StepperComponent } from "../../../components/Stepper";

const steps = [
  "Información General del Tenedor",
  "Contrato del Tenedor",
  "Anexos",
];

const { formId, formField } = holderFormModel;

function _renderStepContent(step: number) {
  switch (step) {
    case 0:
      return <GeneralForm formField={formField} />;
    case 1:
      return <ContractForm formField={formField} />;
    case 2:
      return <DocumentsForm />;
    default:
      return <div>Not Found</div>;
  }
}

export const HoldersFormPage = () => {
  const [activeStep, setActiveStep] = useState(2);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  const loading = useSelector((state: RootState) => state.holders.isLoading);
  const error = useSelector((state: RootState) => state.holders.error);
  const dispatch = useDispatch<AppDispatch>();

  const saveHolder = async (holder: any) => {
    try {
      delete holder.countryId;
      delete holder.departmentId;
      await dispatch(createHolder(holder));
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tenedor creado con exito',
        showConfirmButton: false,
        timer: 2000
      });
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ocurrió un error creando el tenedor',
        showConfirmButton: false,
        timer: 1500
      });
      setActiveStep(activeStep - 1)
      console.error(error);
    }
  };

  async function _handleSubmit(values: any, actions: any) {
    if (isLastStep) {
      //_submitForm(values, actions);
    } else {
      if (activeStep === 1) {
        console.log("creando holder");
        await saveHolder(values);
      }
      console.log(values);
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  return (
    <React.Fragment>
      {loading && <Loading />}
      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}
      <PageTitle title="Crear Tenedor" />
      <StepperComponent steps={steps} activeStep={activeStep} />
      <section>
        {activeStep === steps.length ? (
          <div> Ya llenó el formulario </div>
        ) : (
          <Formik
            initialValues={formInitialValues}
            validationSchema={currentValidationSchema}
            onSubmit={_handleSubmit}
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
                    justifyContent:
                      activeStep === 1 ? "space-evenly" : "initial",
                  }}
                >
                  {_renderStepContent(activeStep)}
                  <Grid item xs={12} alignContent={"rigth"}>
                    <Stack direction="row" justifyContent="end">
                      {activeStep !== 0 && (
                        <Button
                          onClick={_handleBack}
                          variant="contained"
                          color="secondary"
                          sx={{ mr: 4 }}
                        >
                          Atras
                        </Button>
                      )}

                      <Button
                        disabled={props.isSubmitting}
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mr: 2 }}
                      >
                        {isLastStep ? "Finalizar" : "Siguiente"}
                      </Button>

                      {props.isSubmitting && <CircularProgress size={24} />}
                    </Stack>
                  </Grid>
                  {/* <CommentsContainer/>  */}
                </Grid>
              </Form>
            )}
          </Formik>
        )}
      </section>
    </React.Fragment>
  );
};

