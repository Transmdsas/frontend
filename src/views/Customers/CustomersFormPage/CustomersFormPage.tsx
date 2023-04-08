import React, { useState } from "react";
import { CommentsContainer } from "../../../components/comments/CommentsContainer"
import {
  Button,
  CircularProgress,
  Grid,
  Stack,
} from "@mui/material";
import { Formik, Form } from "formik";

import { GeneralForm } from "../CustomersForms/GeneralForm";
import { DocumentsForm } from "../CustomersForms/DocumentsForm";
import { PageTitle } from "../../../components/PageTitle";


import validationSchema from '../CustomersFormModel/validationSchema';
import CustomersFormModel from '../CustomersFormModel/customerFormModel';
import formInitialValues from '../CustomersFormModel/formInitialValues';
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../../components/Loading";
import { StepperComponent } from "../../../components/Stepper";
import { RootState, AppDispatch } from "../../../store";

const steps = [
  "Información General del vehiculo",
  "Tecnomecanica",
  "Polizas",
  "Equipo de comunicaciones",
  "Anexos",
];

const { formId, formField } = CustomersFormModel;

function _renderStepContent(step: number) {
  switch (step) {
    case 0:
      return <GeneralForm formField={formField}/>;
    default:
      return <div>Not Found</div>;
  }
}

export const CustomersFormPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  const loading = useSelector((state: RootState) => state.customers.isLoading);
  const error = useSelector((state: RootState) => state.customers.error);


const dispatch = useDispatch<AppDispatch>();

  const saveCustomer = async(customer: any) => {
    try {
      delete customer.contractTypeId;
      delete customer.contractDueDate;
      delete customer.contractFile;
      delete customer.countryId;
      delete customer.departmentId;
      const result = await dispatch(createCustomer(customer));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

 async function _handleSubmit(values: any, actions: any) {
    if (isLastStep) {
      //_submitForm(values, actions);
    } else {
      if(activeStep === 0){
        console.log("creando holder");
        await saveCustomer(values);
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
      <PageTitle title="Crear Cliente" />
      <StepperComponent steps={steps} activeStep={activeStep}/>

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
      </section>
    </React.Fragment>
    
  );
};
function createCustomer(customer: any): any {
  throw new Error("Function not implemented.");
}

