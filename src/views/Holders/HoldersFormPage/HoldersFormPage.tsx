import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Formik, Form } from "formik";

import { GeneralForm } from "../HoldersForms/GeneralForm";
import { ContractForm } from "../HoldersForms/ContractForm";
import { DocumentsForm } from "../HoldersForms/DocumentsForm";
import { PageTitle } from "../../../components/PageTitle";


import validationSchema from '../FormModel/validationSchema';
import checkoutFormModel from '../FormModel/checkoutFormModel';
import formInitialValues from '../FormModel/formInitialValues';

const steps = [
  "Información General del Tenedor",
  "Contrato del Tenedor",
  "Anexos",
];

const { formId, formField } = checkoutFormModel;

function _renderStepContent(step: number) {
  switch (step) {
    case 0:
      return <GeneralForm />;
    case 1:
      return <ContractForm />;
    case 2:
      return <DocumentsForm />;
    default:
      return <div>Not Found</div>;
  }
}

export const HoldersFormPage = () => {
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
      <PageTitle title="Crear Tenedor" />
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
            {({ isSubmitting }) => (
              <Form id={formId}>
                {_renderStepContent(activeStep)}

                <div>
                  {activeStep !== 0 && (
                    <Button onClick={_handleBack}>Back</Button>
                  )}
                  <div>
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      {isLastStep ? "Place order" : "Next"}
                    </Button>
                    {isSubmitting && <CircularProgress size={24} />}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </React.Fragment>
    </React.Fragment>
  );
};
