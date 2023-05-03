import React, { useCallback, useState } from "react";
import Swal from "sweetalert2";
import { GeneralForm } from "../OwnersForms/GeneralForm";
import { DocumentsForm } from "./../../../components/forms/DocumentsForm/DocumentsForm";
import { PageTitle } from "../../../components/PageTitle";
import ownerFormModel from "../FormModel/ownerFormModel";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import Loading from "../../../components/Loading";
import { createOwner } from "../../../store/owners/ownerSlice";
import { StepperComponent } from "../../../components/Stepper";

const steps = ["Información General del Propietario", "Anexos"];

const { formField } = ownerFormModel;

export const OwnersFormPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const isLastStep = activeStep === steps.length - 1;
  const loading = useSelector((state: RootState) => state.owners.isLoading);
  const error = useSelector((state: RootState) => state.owners.error);
  const dispatch = useDispatch<AppDispatch>();
  //const ownerDocumentList = useSelector((state: RootState) => state.ownerDocuments.ownerDocuments);

  const saveOwner = async (owner: any) => {
    try {
      delete owner.countryId;
      delete owner.departmentId;
      await dispatch(createOwner(owner));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Propietario creado exitosamente",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Ocurrió un error creando el propietario",
        showConfirmButton: false,
        timer: 1500,
      });
      setActiveStep(activeStep - 1);
      console.error(error);
    }
  };

  async function _handleSubmit(values: any, actions: any) {
    if (isLastStep) {
      // _submitForm(values, actions);
    } else {
      if (activeStep === 0) {
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

  const saveOwnerDocument = useCallback(async (values: any) => {
    try {
      console.log("guardando documento");
      console.log(values);
      // await dispatch(createOwnerDocument(values));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Documento creado con exito",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Ocurrió un error creando el documento",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error(error);
    }
  }, []);

  function _renderStepContent(step: number) {
    switch (step) {
      case 0:
        return <GeneralForm formField={formField} onSubmit={_handleSubmit} />;
      case 1:
        return (
          <DocumentsForm
            loadType="Propietario"
            handleSubmit={saveOwnerDocument}
            onCancel={_handleBack}
            gridRows={[]}
            mainPath="propietarios"
          />
        );
      default:
        return <div>Not Found</div>;
    }
  }

  return (
    <React.Fragment>
      {loading && <Loading />}
      <PageTitle title="Crear Propietario" />
      <StepperComponent steps={steps} activeStep={activeStep} />
      <section>
        {activeStep === steps.length ? (
          <div> Ya llenó el formulario </div>
        ) : (
          <>{_renderStepContent(activeStep)}</>
        )}
      </section>
    </React.Fragment>
  );
};
