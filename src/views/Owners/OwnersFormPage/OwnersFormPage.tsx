import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { GeneralForm } from "../OwnersForms/GeneralForm";
import ownerFormModel from "../FormModel/ownerFormModel";
import { PageTitle } from "../../../components/PageTitle";
import Loading from "../../../components/Loading";
import { StepperComponent } from "../../../components/Stepper";
import { DocumentsForm } from "./../../../components/forms/DocumentsForm/DocumentsForm";
import { AppDispatch, RootState } from "../../../store";
import { createOwner } from "../../../store/owners/ownerSlice";
import {
  createOwnerDocument,
  selectAllOwnerDocuments,
} from "../../../store/owners/ownerDocumentSlice";

const steps = ["Información General del Propietario", "Anexos"];

const { formField } = ownerFormModel;

export const OwnersFormPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [ownerId, setOwnerId] = useState("");
  const loading = useSelector((state: RootState) => state.owners.isLoading);
  const error = useSelector((state: RootState) => state.owners.error);
  const ownerDocumentList = useSelector(selectAllOwnerDocuments);
  const dispatch = useDispatch<AppDispatch>();
  const isLastStep = activeStep === steps.length - 1;

  const saveOwner = useCallback(
    async (owner: any) => {
      try {
        delete owner.countryId;
        delete owner.departmentId;
        await dispatch(createOwner(owner))
          .unwrap()
          .then((res) => {
            setOwnerId(res.documentNumber);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Propietario creado exitosamente",
              showConfirmButton: false,
              timer: 2000,
            });
          });
      } catch (err) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Ocurrió un error creando el propietario",
          text: error ? error : "",
          showConfirmButton: false,
          timer: 1500,
        });
        setActiveStep(activeStep - 1);
        console.error(err);
      }
    },
    [dispatch, activeStep, error]
  );

  async function _handleSubmit(values: any, actions: any) {
    if (isLastStep) {
      // _submitForm(values, actions);
    } else {
      if (activeStep === 0) {
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

  const saveOwnerDocument = useCallback(
    async (ownerDocument: any) => {
      try {
        ownerDocument.ownerId = ownerId;
        console.log(ownerDocument);

        await dispatch(createOwnerDocument(ownerDocument))
          .unwrap()
          .then((res) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Documento creado con exito",
              showConfirmButton: false,
              timer: 2000,
            });
          });
      } catch (err) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Ocurrió un error creando el documento",
          text: error ? error : "",
          showConfirmButton: false,
          timer: 1500,
        });
        console.error(err);
      }
    },
    [dispatch, ownerId, error]
  );

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
            gridRows={ownerDocumentList}
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
