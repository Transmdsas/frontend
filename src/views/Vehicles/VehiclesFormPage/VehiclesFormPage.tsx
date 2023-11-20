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
import { VehicleInspectionForm } from "../VehiclesForms/VehicleInspectionForm";
import { VehicleSoatForm } from "../VehiclesForms/VehicleSoatForm";
import { VehicleInsuranceForm } from "../VehiclesForms/VehicleInsuranceForm";
import { VehicleCommunicationForm } from "../VehiclesForms/VehicleCommunicationForm";
import { DocumentsForm } from "../../../components/forms/DocumentsForm/DocumentsForm";

const steps = [
  "Información General del vehiculo",
  "Tecnomecánica",
  "SOAT",
  "Pólizas",
  "Equipo de comunicaciones",
  "Anexos",
];

const { formField } = vehicleFormModel;

export const VehiclesFormPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [vehicle, setVehicle] = useState<any>({});
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
            setVehicle(res);
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
    [dispatch]
  );

  const saveVehicleDocument = () => {}

  async function _handleSubmit(values: any, actions: any) {
    switch (activeStep) {
      case 0:
        await saveVehicle(values);
        _handleNext();
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

  function _handleNext() {
    setActiveStep(activeStep + 1);
  }

  function _renderStepContent(step: number) {
    switch (step) {
      case 0:
        return <GeneralForm formField={formField} onSubmit={_handleSubmit} />;
      case 1:
        return <VehicleInspectionForm carPlate={vehicle.carPlate} onCancel={_handleBack} onSuccessSave={_handleNext}/>
      case 2:
        return <VehicleSoatForm carPlate={vehicle.carPlate} onCancel={_handleBack} onSuccessSave={_handleNext}/>
      case 3: 
        return <VehicleInsuranceForm carPlate={vehicle.carPlate} onCancel={_handleBack} onSuccessSave={_handleNext}/>
      case 4:
        return <VehicleCommunicationForm carPlate={vehicle.carPlate} onCancel={_handleBack} onSuccessSave={_handleNext}/>
      case 5:
        return (
          <DocumentsForm
            loadType="Vehículo"
            referenceCode={vehicle.vehicleCodeId}
            handleSubmit={saveVehicleDocument}
            onCancel={_handleBack}
           // gridRows={driverDocumentList}
            mainPath="vehiculos"
          />)
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
