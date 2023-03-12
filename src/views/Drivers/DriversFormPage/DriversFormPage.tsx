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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./../../../store";
import { createDriver } from './../../../store/drivers/driverSlice';

import { PageTitle } from "../../../components/PageTitle";
import Loading from "../../../components/Loading";
import { GeneralForm } from "../DriversForms/GeneralForm";
import { ContractForm } from "../DriversForms/ContractForm";
import { DocumentsForm } from "../DriversForms/DocumentsForm";

import validationSchema from "../FormModel/validationSchema";
import driverFormModel from "../FormModel/driverFormModel";
import formInitialValues from "../FormModel/formInitialValues";

const steps = [
  "Información General del Conductor",
  "Contrato del Conductor",
  "Anexos",
];

const { formId, formField } = driverFormModel;

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

export const DriversFormPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  const loading = useSelector((state: RootState) => state.drivers.isLoading);
  const error = useSelector((state: RootState) => state.drivers.error);
  
  const dispatch = useDispatch<AppDispatch>();

  async function _submitForm(values: any, actions: any) {
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
    setActiveStep(activeStep + 1);
  }

  const saveDriver = async(driver: any) => {
    try {
      delete driver.contractTypeId;
      delete driver.contractDueDate;
      delete driver.contractFile;
      const result = await dispatch(createDriver(driver));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  async function _handleSubmit(values: any, actions: any) {
    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      if(activeStep === 0){
        console.log("creando conductor");
        await saveDriver(values);
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
    {error && <div><p>{error}</p></div>}
    <PageTitle title="Crear Conductor" />
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
              <Grid
                container
                rowSpacing={4}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                sx={{ p: 2, mt: 3, mb: 3, justifyContent: activeStep === 1 ? "space-evenly" : "initial" }}
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
                      {isLastStep ? "Guardar" : "Siguiente"}
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
    </React.Fragment>
  </React.Fragment>
  
);
};