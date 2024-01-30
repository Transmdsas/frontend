import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./../../../store";
import { useParams } from "react-router-dom";
import {
  createHolder,
  getHolderById,
  updateHolder,
} from "./../../../store/holders/holderSlice";
import {
  createHolderDocument,
  selectAllHolderDocuments,
  getHolderDocuments,
} from "./../../../store/holders/holderDocumentSlice";
import { PageTitle } from "../../../components/PageTitle";
import { GeneralForm } from "../HoldersForms/GeneralForm";
import { ContractForm } from "../HoldersForms/ContractForm";
import { DocumentsForm } from "../../../components/forms/DocumentsForm/DocumentsForm";
import { StepperComponent } from "../../../components/Stepper";
import Loading from "../../../components/Loading";
import holderFormModel from "../FormModel/holderFormModel";
import useAlerts from "../../../hooks/useAlerts";
import formInitialValues from "./../FormModel/formInitialValues";
import { useGetDocuments } from "./../../../hooks/useGetDocuments";

const steps = [
  "Información General del Tenedor",
  "Contrato del Tenedor",
  "Anexos",
];

const { formField } = holderFormModel;

export const HoldersFormPage = () => {
  const { successMessage, errorMessage } = useAlerts();
  const { docNum } = useParams<{ docNum: string | undefined }>();
  const isEditMode = docNum !== undefined;
  const [activeStep, setActiveStep] = useState(0);
  const [holder, setHolder] = useState<any>({});
  const [initialValues, setInitialValues] = useState<any>(formInitialValues);
  const loading = useSelector((state: RootState) => state.holders.isLoading);
  const holderDocumentList = useSelector(selectAllHolderDocuments);
  const { holderDocuments } = useGetDocuments();
  const dispatch = useDispatch<AppDispatch>();

  const saveHolder = useCallback(
    async (holder: any) => {
      delete holder.countryId;
      delete holder.departmentId;
      delete holder.isComplete;
      delete holder.documentType;
      delete holder.bank;
      delete holder.city;

      if (!isEditMode) {
        //reestablece los documentos del tenedor
        holderDocuments(holder.documentNumber);
        await dispatch(createHolder(holder))
          .unwrap()
          .then((res) => {
            successMessage("Tenedor creado con éxito");

          })
          .catch((err) => {
            errorMessage("Ocurrió un error creando el tenedor");
            setActiveStep(activeStep - 1);
            console.error(err);
          });
      } else {
        await dispatch(
          updateHolder({
            id: docNum,
            data: holder,
          })
        )
          .then((res) => {
            successMessage("Tenedor actualizado con éxito");
          })
          .catch((err) => {
            errorMessage("Ocurrió un error creando el tenedor");
            setActiveStep(activeStep - 1);
            console.error(err);
          });
      }
    },
    [isEditMode, holderDocuments, dispatch, successMessage, errorMessage, activeStep, docNum]
  );

  const getHolder = useCallback(
    async (docNum: string) => {
      return await dispatch(getHolderById(docNum)).unwrap();
    },
    [dispatch]
  );

  useEffect(() => {
    if (docNum) {
      getHolder(docNum)
        .then((res) => {
          //setHolder(res);
          setInitialValues({ ...res });
        })
        .catch((err) => {
          errorMessage("Ocurrió un error consultando el tenedor");
          console.error(err);
        });
        holderDocuments(docNum)
        .then()
        .catch((err) => {
          errorMessage(
            "Ocurrió un error consultando los documentos del tenedor"
          );
          console.error(err);
        });
    }
  }, [docNum, errorMessage, getHolder, holderDocuments]);

  useEffect(() => {
    if (holder.isComplete) {
      saveHolder(holder);
    }
  }, [holder, saveHolder]);

  async function _handleSubmit(values: any, actions: any) {
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

  const saveHolderDocument = useCallback(
    async (holderDocument: any) => {
      holderDocument.holderId = holder.documentNumber;
      await dispatch(createHolderDocument(holderDocument))
        .unwrap()
        .then((res) => {
          successMessage("Documento creado con éxito");
        })
        .catch((err) => {
          errorMessage("Ocurrió un error creando el documento");
          console.error(err);
        });
    },
    [dispatch, holder, successMessage, errorMessage]
  );

  function _renderStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <GeneralForm
            formField={formField}
            onSubmit={_handleSubmit}
            initialValues={initialValues}
          />
        );
      case 1:
        return (
          <ContractForm
            formField={formField}
            onSubmit={_handleSubmit}
            onCancel={_handleBack}
            initialValues={initialValues}
          />
        );
      case 2:
        return (
          <DocumentsForm
            loadType="Tenedor"
            handleSubmit={saveHolderDocument}
            onCancel={_handleBack}
            gridRows={holderDocumentList}
            mainPath="tenedores"
          />
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
      <PageTitle title={`${isEditMode ? "Editar" : "Crear"} Tenedor`} />
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
