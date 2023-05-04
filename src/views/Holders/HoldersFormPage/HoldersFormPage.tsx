import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { AppDispatch, RootState } from "./../../../store";
import { createHolder } from "./../../../store/holders/holderSlice";
import { createHolderDocument, selectAllHolderDocuments } from "./../../../store/holders/holderDocumentSlice";
import { PageTitle } from "../../../components/PageTitle";
import Loading from "../../../components/Loading";
import { GeneralForm } from "../HoldersForms/GeneralForm";
import { ContractForm } from "../HoldersForms/ContractForm";
import { DocumentsForm } from "../../../components/forms/DocumentsForm/DocumentsForm";
import holderFormModel from "../FormModel/holderFormModel";
import { StepperComponent } from "../../../components/Stepper";

const steps = [
  "Información General del Tenedor",
  "Contrato del Tenedor",
  "Anexos",
];

const { formField } = holderFormModel;

export const HoldersFormPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [holder, setHolder] = useState<any>({});
  const isLastStep = activeStep === steps.length - 1;
  const loading = useSelector((state: RootState) => state.holders.isLoading);
  const error = useSelector((state: RootState) => state.holders.error);
  const holderDocumentList = useSelector(selectAllHolderDocuments);
  const dispatch = useDispatch<AppDispatch>();

  const saveHolder = useCallback(
    async (holder: any) => {
      try {
        delete holder.countryId;
        delete holder.departmentId;
        delete holder.isComplete;
        await dispatch(createHolder(holder))
          .unwrap()
          .then((res) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Tenedor creado con exito",
              showConfirmButton: false,
              timer: 2000,
            });
          });
      } catch (err) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Ocurrió un error creando el tenedor",
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

  useEffect(() => {
    async function save() {
      await saveHolder(holder);
    }

    if (holder.isComplete) {
      save();
    }
  }, [holder, saveHolder]);

  async function _handleSubmit(values: any, actions: any) {
    if (isLastStep) {
      //_submitForm(values, actions);
    } else {
      if (activeStep === 1) {
        setHolder({
          ...holder,
          contractDueDate: values.contractDueDate,
          contractFile: values.contractFile,
          contractTypeId: values.contractTypeId,
          isComplete: true,
        });
      } else if (activeStep === 0) {
        setHolder(values);
      }
      setActiveStep(activeStep + 1);
    }
  }

  const saveHolderDocument = useCallback(
    async (holderDocument: any) => {
      try {
        holderDocument.holderId = holder.documentNumber;
        await dispatch(createHolderDocument(holderDocument))
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
    [dispatch, holder, error]
  );

  function _renderStepContent(step: number) {
    switch (step) {
      case 0:
        return <GeneralForm formField={formField} onSubmit={_handleSubmit} />;
      case 1:
        return (
          <ContractForm
            formField={formField}
            onSubmit={_handleSubmit}
            onCancel={_handleBack}
          />
        );
      case 2:
        return (
          <DocumentsForm loadType="Tenedor" handleSubmit={saveHolderDocument} onCancel={_handleBack} gridRows={holderDocumentList} mainPath="tenedores" />
        );
      default:
        return <div>Not Found</div>;
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  return (
    <React.Fragment>
      {loading && <Loading />}
      <PageTitle title="Crear Tenedor" />
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
