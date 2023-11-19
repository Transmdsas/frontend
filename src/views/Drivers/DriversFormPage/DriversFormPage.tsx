import React, { useCallback, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./../../../store";
import { createDriver } from "./../../../store/drivers/driverSlice";
import { createDriverDocument, selectAllDriverDocuments } from "./../../../store/drivers/driverDocumentSlice";
import { PageTitle } from "../../../components/PageTitle";
import Loading from "../../../components/Loading";
import { DocumentsForm } from "../../../components/forms/DocumentsForm/DocumentsForm";
import { StepperComponent } from "../../../components/Stepper";
import { GeneralForm } from "../DriversForms/GeneralForm";
import driverFormModel from "../FormModel/driverFormModel";
import DriverContactsForm from "../DriversForms/DriverContactsForm";
import DriverReferencesForm from "../DriversForms/DriverReferencesForm";

const steps = ["Información General del Conductor", "Contactos", "Referencias", "Anexos"];

const { formField } = driverFormModel;

export const DriversFormPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [driver, setDriver] = useState<any>({});
  const isLastStep = activeStep === steps.length - 1;
  const loading = useSelector((state: RootState) => state.drivers.isLoading);
  const error = useSelector((state: RootState) => state.drivers.error);
  const driverDocumentList = useSelector(selectAllDriverDocuments);
  const dispatch = useDispatch<AppDispatch>();

  const saveDriver = useCallback(async (driver: any) => {
    try {
      delete driver.countryId;
      delete driver.departmentId;
      delete driver.isComplete;
      await dispatch(createDriver(driver))
        .unwrap()
        .then((res) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Conductor creado con exito",
            showConfirmButton: false,
            timer: 2000,
          });
          setDriver(res);
        });
    } catch (err) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Ocurrió un error creando el conductor",
        text: error ? error : "",
        showConfirmButton: false,
        timer: 1500,
      });
      setActiveStep(activeStep - 1);
      console.error(err);
    }
  }, [activeStep, dispatch, error]);

  const saveDriverDocument = useCallback(
    async (driverDocument: any) => {
      try {
        driverDocument.driverId = driver.documentNumber;
        //driverDocument.referenceCode = driver.driverCodeId;
        await dispatch(createDriverDocument(driverDocument))
          .unwrap()
          .then((res) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Documento creado con exito",
              showConfirmButton: false,
              timer: 2000,
            });
          }
          );
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
    }, [driver.documentNumber, dispatch, error]);

  async function _handleSubmit(values: any, actions: any) {
    if (isLastStep) {
      if(driverDocumentList.length <= 0){
        Swal.fire({
          position: "center",
          icon: "info",
          title: "Debe adjuntar los documentos del conductor",
          text: error ? error : "",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
    } else {
      if (activeStep === 0) {
        await saveDriver(values);
      }
      _handleNext();
    }
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
        return <GeneralForm formField={formField} onSubmit={_handleSubmit} />;
      case 1:
        return <DriverContactsForm driverId={driver.documentNumber} onCancel={_handleBack} onSuccessSave={_handleNext}/>
      case 2: 
        return <DriverReferencesForm driverId={driver.documentNumber} onCancel={_handleBack} onSuccessSave={_handleNext} />
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
