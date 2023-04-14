import React, { useState } from "react";
// import { CommentsContainer } from "../../../components/comments/CommentsContainer"
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
import Swal from 'sweetalert2';
import { GeneralForm } from "../OwnersForms/GeneralForm";
import { DocumentsForm } from "../OwnersForms/DocumentsForm";
import { PageTitle } from "../../../components/PageTitle";

import validationSchema from "../FormModel/validationSchema";
import ownerFormModel from "../FormModel/ownerFormModel";
import formInitialValues from "../FormModel/formInitialValues";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import Loading from "../../../components/Loading";
import { createOwner } from "../../../store/owners/ownerSlice";
import { StepperComponent } from "../../../components/Stepper";

const steps = ["Información General del Propietario", "Anexos"];

const { formId, formField } = ownerFormModel;

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

export const OwnersFormPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  const loading = useSelector((state: RootState) => state.owners.isLoading);
  const error = useSelector((state: RootState) => state.owners.error);

  const dispatch = useDispatch<AppDispatch>();
  

  const saveOwner = async(owner:any) => {
    try {
      delete owner.countryId;
      delete owner.departmentId;
      await dispatch(createOwner(owner));
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Orden de Carga creada con exito',
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
      // _submitForm(values, actions);
    } else {
      if(activeStep === 0){
        console.log("creando owner");
        await saveOwner(values);
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
      <PageTitle title="Crear Propietario" />
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