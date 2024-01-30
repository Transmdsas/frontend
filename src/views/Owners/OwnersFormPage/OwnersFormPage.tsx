import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GeneralForm } from "../OwnersForms/GeneralForm";
import ownerFormModel from "../FormModel/ownerFormModel";
import { PageTitle } from "../../../components/PageTitle";
import Loading from "../../../components/Loading";
import { StepperComponent } from "../../../components/Stepper";
import { DocumentsForm } from "./../../../components/forms/DocumentsForm/DocumentsForm";
import { AppDispatch, RootState } from "../../../store";
import { createOwner, getOwnerById, updateOwner } from "../../../store/owners/ownerSlice";
import {
  createOwnerDocument,
  selectAllOwnerDocuments
} from "../../../store/owners/ownerDocumentSlice";
import useAlerts from "../../../hooks/useAlerts";
import { useParams } from "react-router-dom";
import formInitialValues from "./../FormModel/formInitialValues";
import { useGetDocuments } from "./../../../hooks/useGetDocuments";

const steps = ["Información General del Propietario", "Anexos"];

const { formField } = ownerFormModel;

export const OwnersFormPage = () => {
  const { successMessage, errorMessage } = useAlerts();
  const { docNum } = useParams<{ docNum: string | undefined }>();
  const isEditMode = docNum !== undefined;
  const [activeStep, setActiveStep] = useState(0);
  const [ownerId, setOwnerId] = useState("");
  const [initialValues, setInitialValues] = useState<any>(formInitialValues);
  const loading = useSelector((state: RootState) => state.owners.isLoading);
  const ownerDocumentList = useSelector(selectAllOwnerDocuments);
  const { ownerDocuments } = useGetDocuments();
  const dispatch = useDispatch<AppDispatch>();

  const getOwner = useCallback(
    async (docNum: string) => {
      return await dispatch(getOwnerById(docNum)).unwrap();
    },
    [dispatch],
  );

  useEffect(() => {
    if(docNum) {
      getOwner(docNum)
      .then((res) => {
        setInitialValues({...res});
      })
      .catch((err) => {
        errorMessage("Ocurrió un error consultando el propietario");
        console.error(err);
      });
      ownerDocuments(docNum)
      .then()
      .catch((err) => {
        errorMessage(
          "Ocurrió un error consultando los documentos del propietario"
        );
        console.error(err);
      });
    }
  }, [docNum, errorMessage, getOwner, ownerDocuments]);

  const saveOwner = useCallback(
    async (owner: any) => {
      delete owner.countryId;
      delete owner.departmentId;
      delete owner.documentType;
      delete owner.bank;
      delete owner.city;
      if (!isEditMode) {
        ownerDocuments(owner.documentNumber);
        await dispatch(createOwner(owner))
        .unwrap()
        .then((res) => {
          setOwnerId(res.documentNumber);
          successMessage("Propietario creado exitosamente");
        })
        .catch((err) => {
          errorMessage("Ocurrió un error creando el propietario");
          console.error(err);
        });
      }else {
        await dispatch(
          updateOwner({ id: docNum, data: owner })
        ).then((res) => {
          successMessage("Propietario actualizado con éxito");
        })
        .catch((err) => {
          errorMessage("Ocurrió un error creando el propietario");
            setActiveStep(activeStep - 1);
            console.error(err);
        });

      }
    },
    [isEditMode, ownerDocuments, dispatch, successMessage, errorMessage, docNum, activeStep]
  );

  async function _handleSubmit(values: any, actions: any) {
    if (activeStep === 0) {
      await saveOwner(values);
    }
    setActiveStep(activeStep + 1);
    actions.setTouched({});
    actions.setSubmitting(false);
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  const saveOwnerDocument = useCallback(
    async (ownerDocument: any) => {
        ownerDocument.ownerId = ownerId;
        await dispatch(createOwnerDocument(ownerDocument))
          .unwrap()
          .then((res) => {
            successMessage("Documento creado con éxito");
          })
          .catch((err) => {
            errorMessage("Ocurrió un error creando el documento");
          console.error(err);
          });
    },
    [ownerId, dispatch, successMessage, errorMessage]
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
      <PageTitle title={`${isEditMode ? "Editar" : "Crear"} Propietario`} />
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
