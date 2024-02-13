import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./../../../store";
import {
  createDriver,
  getDriverById,
  updateDriver,
} from "./../../../store/drivers/driverSlice";
import {
  createDriverDocument,
  selectAllDriverDocuments,
} from "./../../../store/drivers/driverDocumentSlice";
import { PageTitle } from "../../../components/PageTitle";
import Loading from "../../../components/Loading";
import { DocumentsForm } from "../../../components/forms/DocumentsForm/DocumentsForm";
import { StepperComponent } from "../../../components/Stepper";
import { GeneralForm } from "../DriversForms/GeneralForm";
import driverFormModel from "../FormModel/driverFormModel";
import DriverContactsForm from "../DriversForms/DriverContactsForm";
import DriverReferencesForm from "../DriversForms/DriverReferencesForm";
import formInitialValues from "./../FormModel/formInitialValues";
import { useParams } from "react-router-dom";
import useAlerts from "../../../hooks/useAlerts";
import { useGetDocuments } from "../../../hooks/useGetDocuments";

const steps = [
  "Información General del Conductor",
  "Contactos",
  "Referencias",
  "Anexos",
];

const { formField } = driverFormModel;

export const DriversFormPage = () => {
  const { successMessage, errorMessage } = useAlerts();
  const [activeStep, setActiveStep] = useState(0);
  const { docNum } = useParams<{ docNum: string | undefined }>();
  const isEditMode = docNum !== undefined;
  const [driver, setDriver] = useState<any>({});
  const [initialValues, setInitialValues] = useState<any>(formInitialValues);
  const loading = useSelector((state: RootState) => state.drivers.isLoading);
  const driverDocumentList = useSelector(selectAllDriverDocuments);
  const { driverDocuments } = useGetDocuments();
  const dispatch = useDispatch<AppDispatch>();

  const saveDriver = useCallback(
    async (driver: any) => {
      delete driver.countryId;
      delete driver.departmentId;
      delete driver.isComplete;
      delete driver.documentType;
      delete driver.bank;
      delete driver.city;
      if (!isEditMode) {
        await dispatch(createDriver(driver))
          .unwrap()
          .then((res) => {
            successMessage("Conductor creado con éxito");
            setDriver(res);
          })
          .catch((err) => {
            errorMessage("Ocurrió un error creando el conductor", err.message);
            setActiveStep(activeStep - 1);
            console.error(err);
          });
      } else {
        await dispatch(updateDriver({ id: docNum, data: driver }))
          .then((res) => {
            successMessage("Conductor actualizado exitosamente");
          })
          .catch((err) => {
            errorMessage(
              "Ocurrió un error actualizando el conductor",
              err.message
            );
            setActiveStep(activeStep - 1);
            console.error(err);
          });
      }
    },
    [activeStep, dispatch, docNum, errorMessage, isEditMode, successMessage]
  );

  const getDriver = useCallback(
    async (docNum: string) => {
      return await dispatch(getDriverById(docNum)).unwrap();
    },
    [dispatch]
  );

  useEffect(() => {
    if (docNum) {
      getDriver(docNum)
        .then((res) => {
          setInitialValues({ ...res });
        })
        .catch((err: any) => {
          errorMessage(
            "Ocurrió un error consultando al conductor",
            err.message
          );
          console.error(err);
        });
      driverDocuments(docNum)
        .then()
        .catch((err) => {
          errorMessage(
            "Ocurrió un error consultando los documentos del conductor",
            err.message
          );
          console.error(err);
        });
    }
  }, [docNum, driverDocuments, errorMessage, getDriver]);

  const saveDriverDocument = useCallback(
    async (driverDocument: any) => {
      driverDocument.driverId = driver.documentNumber;
      await dispatch(createDriverDocument(driverDocument))
        .unwrap()
        .then((res) => {
          successMessage("Documento creado con éxito");
        })
        .catch((err) => {
          errorMessage("Ocurrió un error creando el documento", err.message);
          console.error(err);
        });
    },
    [driver.documentNumber, dispatch, successMessage, errorMessage]
  );

  async function _handleSubmit(values: any, actions: any) {
    if (activeStep === 0) {
      await saveDriver(values);
    }
    _handleNext();
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  function _handleNext() {
    setActiveStep(activeStep + 1);
  }

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
          <DriverContactsForm
            driverId={driver.documentNumber}
            onCancel={_handleBack}
            onSuccessSave={_handleNext}
          />
        );
      case 2:
        return (
          <DriverReferencesForm
            driverId={driver.documentNumber}
            onCancel={_handleBack}
            onSuccessSave={_handleNext}
          />
        );
      case 3:
        return (
          <DocumentsForm
            loadType="Conductor"
            referenceCode={driver.driverCodeId}
            handleSubmit={saveDriverDocument}
            onCancel={_handleBack}
            gridRows={driverDocumentList}
            mainPath="conductores"
          />
        );
      default:
        return <div>Not Found</div>;
    }
  }

  return (
    <React.Fragment>
      {loading && <Loading />}
      <PageTitle title="Crear Conductor" />
      <StepperComponent steps={steps} activeStep={activeStep} />
      <section>
        {activeStep === steps.length ? (
          <div> Ya llenó el formulario </div>
        ) : (
          <> {_renderStepContent(activeStep)}</>
        )}
      </section>
    </React.Fragment>
  );
};
