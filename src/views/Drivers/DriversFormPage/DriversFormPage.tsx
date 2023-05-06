import React, { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./../../../store";
import { createDriver } from "./../../../store/drivers/driverSlice";
import { createDriverDocument, selectAllDriverDocuments } from "./../../../store/holders/driverDocumentSlice";
import { PageTitle } from "../../../components/PageTitle";
import Loading from "../../../components/Loading";
import { DocumentsForm } from "../../../components/forms/DocumentsForm/DocumentsForm";
import { StepperComponent } from "../../../components/Stepper";
import { GeneralForm } from "../DriversForms/GeneralForm";
import driverFormModel from "../FormModel/driverFormModel";

const steps = ["Información General del Conductor", "Referencias", "Anexos"];

const { formField } = driverFormModel;

export const DriversFormPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [driver, setDriver] = useState<any>({});
  const isLastStep = activeStep === steps.length - 1;
  const loading = useSelector((state: RootState) => state.drivers.isLoading);
  const error = useSelector((state: RootState) => state.drivers.error);
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
        driverDocument.referenceCode = driver.driverCodeId;
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
        setActiveStep(activeStep - 1);
        console.error(err);
      }
    }, [driver.documentNumber, driver.driverCodeId, dispatch, error, activeStep]);


  useEffect(() => {
    async function save() {
      await saveDriver(driver);
    }

    if (driver.isComplete) {
      save();
    }
  }, [driver, saveDriver]);

  async function _handleSubmit(values: any, actions: any) {
    if (isLastStep) {
      // _submitForm(values, actions);
    } else {
      if (activeStep === 1) {
        setDriver({ ...driver, ...values, isComplete: true });
      } else if (activeStep === 0) {
        setDriver(values);
      }
      setActiveStep(activeStep + 1);
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  function _renderStepContent(step: number) {
    switch (step) {
      case 0:
        return <GeneralForm formField={formField} onSubmit={_handleSubmit} />;
      case 1:
        return (
          <DocumentsForm
            loadType="Conductor"
            referenceCode={driver.driverCodeId}
            handleSubmit={saveDriverDocument}
            onCancel={_handleBack}
            gridRows={[]}
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
