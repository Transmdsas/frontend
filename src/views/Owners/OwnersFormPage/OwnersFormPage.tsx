import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  CircularProgress,
  Grid,
  Stack,
} from "@mui/material";
import { Formik, Form } from "formik";

import { GeneralForm } from "../OwnersForms/GeneralForm";
import { DocumentsForm } from "../OwnersForms/DocumentsForm";
import { PageTitle } from "../../../components/PageTitle";


import validationSchema from '../FormModel/validationSchema';
import ownerFormModel from '../FormModel/ownerFormModel';
import formInitialValues from '../FormModel/formInitialValues';

const steps = [
  "Información General del Propietario",
  "Anexos",
];

const { formId, formField } = ownerFormModel;

function _renderStepContent(step: number) {
  switch (step) {
    case 0:
      return <GeneralForm formField={formField}/>;
    case 1:
      return <DocumentsForm />;
    default:
      return <div>Not Found</div>;
  }
}

export const OwnersFormPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  function _sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function _submitForm(values: any, actions: any) {
    await _sleep(1000);
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);

    setActiveStep(activeStep + 1);
  }

  function _handleSubmit(values: any, actions: any) {
    console.log('submit', activeStep);
    
    if (isLastStep) {
      _submitForm(values, actions);
    } else {
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
      <PageTitle title="Crear Propietario" />
      <Stepper
        activeStep={activeStep}
        nonLinear
        alternativeLabel
        sx={{
          "& .MuiStepIcon-root": {
            width: "2em",
            height: "2em",
          },
          "& .MuiStepConnector-root": {
            top: "24px",
            left: "calc(-50% + 35px); right: calc(50% + 35px)",
          },
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <React.Fragment>
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
                <Grid container spacing={3} mt={3} mb={3}>
                {_renderStepContent(activeStep)}
                <Grid item xs={12} alignContent={"rigth"}>
                <Stack direction="row" justifyContent="end">
                
                  {activeStep !== 0 && (
                    <Button onClick={_handleBack}>Back</Button>
                  )}
                    <Button
                      disabled={props.isSubmitting}
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      {isLastStep ? "Place order" : "Next"}
                    </Button>
                    {props.isSubmitting && <CircularProgress size={24} />}
                    </Stack>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        )}
      </React.Fragment>
    </React.Fragment>
  );
};