import React, { useCallback, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./../../../store";
import { createVehicle } from "./../../../store/vehicles/vehicleSlice";
import { PageTitle } from "../../../components/PageTitle";
import Loading from "../../../components/Loading";
// import { DocumentsForm } from "../../../components/forms/DocumentsForm/DocumentsForm";
import { StepperComponent } from "../../../components/Stepper";
import { GeneralForm } from "../VehiclesForms/GeneralForm";
import vehicleFormModel from "../FormModel/vehicleFormModel";

const steps = [
  "Información General del vehiculo",
  "Tecnomecánica",
  "Pólizas",
  "Equipo de comunicaciones",
  "Anexos",
];

const { formField } = vehicleFormModel;

export const VehiclesFormPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const isLastStep = activeStep === steps.length - 1;
  const loading = useSelector((state: RootState) => state.vehicles.isLoading);
  const error = useSelector((state: RootState) => state.vehicles.error);

  const dispatch = useDispatch<AppDispatch>();

  const saveVehicle = useCallback(
    async (vehicle: any) => {
      try {
        await dispatch(createVehicle(vehicle))
          .unwrap()
          .then((res) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Vehículo creado con exito",
              showConfirmButton: false,
              timer: 2000,
            });
            setActiveStep(activeStep + 1);
          });
      } catch (err: any) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Ocurrió un error creando el vehículo",
          text: err.message ? err.message : "",
          showConfirmButton: true,
          timer: 3000,
        });
      }
    },
    [activeStep, dispatch]
  );

  async function _handleSubmit(values: any, actions: any) {
    switch (activeStep) {
      case 0:
        await saveVehicle(values);
        break;
      default:
        break;
    }

    actions.setTouched({});
    actions.setSubmitting(false);
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  function _renderStepContent(step: number) {
    switch (step) {
      case 0:
        return <GeneralForm formField={formField} onSubmit={_handleSubmit} />;
      case 1:
        // return <DriverContactsForm driverId={driver.documentNumber} onCancel={_handleBack} onSuccessSave={_handleNext}/>
        break;
      case 2:
        // return <DriverReferencesForm driverId={driver.documentNumber} onCancel={_handleBack} onSuccessSave={_handleNext} />
        break;
      case 3:
        return (
          // <DocumentsForm
          //   loadType="Conductor"
          //   referenceCode={driver.driverCodeId}
          //   handleSubmit={saveDriverDocument}
          //   onCancel={_handleBack}
          //   gridRows={driverDocumentList}
          //   mainPath="conductores"
          // />
          <></>
        );
      default:
        return <div>Not Found</div>;
    }
  }

  return (
    <React.Fragment>
      {loading && <Loading />}
      <PageTitle title="Crear Vehículo" />
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
