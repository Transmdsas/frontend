import React, { useState } from "react";
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

  const saveVehicle = async (vehicle: any) => {
    try {
      delete vehicle.countryId;
      await dispatch(createVehicle(vehicle));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Vehículo creado con exito",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Ocurrió un error creando el vehiculo",
        showConfirmButton: false,
        timer: 1500,
      });
      setActiveStep(activeStep - 1);
      console.error(error);
    }
  };

  async function _handleSubmit(values: any, actions: any) {
    // if (isLastStep) {
    //   // _submitForm(values, actions);
    // } else {
    //   if (activeStep === 0) {
    //     console.log("creando vehicle");
    //     await saveVehicle(values);
    //   }

    //   console.log(values);
    //   setActiveStep(activeStep + 1);
    //   actions.setTouched({});
    //   actions.setSubmitting(false);
    // }
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
