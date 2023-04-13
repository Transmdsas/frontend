import React, { useState } from "react";
import { CommentsContainer } from "../../../components/comments/CommentsContainer"
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
import { GeneralForm } from "../OrdersForms/GeneralForm";
import { DocumentsForm } from "../OrdersForms/DocumentsForm";
import { PageTitle } from "../../../components/PageTitle";


import validationSchema from "../FormModel/validationSchema";
import orderFormModel from "../FormModel/orderFormModel";
import formInitialValues from "../FormModel/formInitialValues";
import Loading from "../../../components/Loading";
import { createOrder } from "../../../store/orders/orderSlice";

const steps = [
  "Nueva orden de cargue",
];

const { formId, formField } = orderFormModel;

function _renderStepContent(step: number) {
  switch (step) {
    case 0:
      return <GeneralForm formField={formField} />;
    case 1:
      return <DocumentsForm />;
    default:
      return <div>Not Found</div>;
  }
}


export const OrdersFormPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  const loading = useSelector((state: RootState) => state.orders.isLoading);
  const error = useSelector((state: RootState) => state.orders.error);

  const dispatch = useDispatch<AppDispatch>();
  
   async function _submitForm(values: any, actions: any) {
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);

    setActiveStep(activeStep + 1);
  }

  const saveOrder = async(order:any) => {
    try {
      delete order.countryId;
      delete order.departmentId;
      const result = await dispatch(createOrder(order));
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
        console.log("creando order");
        await saveOrder(values);
      }
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
      <PageTitle title="Crear Orden De Cargue" />
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
