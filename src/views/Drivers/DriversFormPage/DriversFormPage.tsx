import React, { useEffect, useState } from "react";
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
import { resetSelectedCountry } from "../../../store/countries/countrySlice";
import { resetSelectedDepartment } from "../../../store/departments/departmentSlice";

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
  const isEditMode = !!docNum;
  const [formData, setFormData] = useState<any>(formInitialValues);
  const loading = useSelector((state: RootState) => state.drivers.isLoading);
  const driverDocumentList = useSelector(selectAllDriverDocuments);
  const { driverDocuments } = useGetDocuments();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (docNum) {
      dispatch(getDriverById(docNum))
        .unwrap()
        .then((res) => {
          setFormData(res);
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
    } else {
      dispatch(resetSelectedCountry());
      dispatch(resetSelectedDepartment());
    }
  }, [docNum, driverDocuments, dispatch, errorMessage]);

  const saveDriver = async (driverData: any) => {
    const filteredData = { ...driverData };
    delete filteredData.countryId;
    delete filteredData.departmentId;
    delete filteredData.isComplete;
    delete filteredData.documentType;
    delete filteredData.bank;
    delete filteredData.city;
    delete filteredData.driverCode;
    delete filteredData.licenceCategory;

    try {
      const action = isEditMode
        ? updateDriver({ id: docNum, data: filteredData })
        : createDriver(filteredData);

      const res = await dispatch(action).unwrap();
      setFormData(res);
      successMessage(
        `Conductor ${isEditMode ? "actualizado" : "creado"} exitosamente`
      );
      if (!isEditMode) driverDocuments(formData.documentNumber);
    } catch (err: any) {
      errorMessage(
        `Ocurrió un error ${
          isEditMode ? "actualizando" : "creando"
        } el conductor`,
        err.message
      );
      console.error(err);
      setActiveStep(activeStep - 1);
    }
  };

  const saveDriverDocument = async (driverDocument: any) => {
    driverDocument.driverId = formData.documentNumber;
    try {
      await dispatch(createDriverDocument(driverDocument)).unwrap();
      successMessage("Documento creado con éxito");
    } catch (err: any) {
      errorMessage("Ocurrió un error creando el documento", err.message);
      console.error(err);
    }
  };

  const handleSubmit = async (values: any, actions: any) => {
    if (activeStep === 0) {
      await saveDriver(values);
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => setActiveStep(activeStep - 1);

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <GeneralForm
            formField={formField}
            onSubmit={handleSubmit}
            initialValues={formData}
          />
        );
      case 1:
        return (
          <DriverContactsForm
            driverId={formData.documentNumber}
            onCancel={handleBack}
            onSuccessSave={() => setActiveStep(activeStep + 1)}
            isEditMode={isEditMode}
          />
        );
      case 2:
        return (
          <DriverReferencesForm
            driverId={formData.documentNumber}
            onCancel={handleBack}
            onSuccessSave={() => setActiveStep(activeStep + 1)}
            isEditMode={isEditMode}
          />
        );
      case 3:
        return (
          <DocumentsForm
            loadType="Conductor"
            referenceCode={formData.driverCodeId}
            handleSubmit={saveDriverDocument}
            onCancel={handleBack}
            gridRows={driverDocumentList}
            mainPath="conductores"
          />
        );
      default:
        return <div>Not Found</div>;
    }
  };

  return (
    <React.Fragment>
      {loading && <Loading />}
      <PageTitle
        title={isEditMode ? "Actualizar Conductor" : "Crear Conductor"}
      />
      <StepperComponent steps={steps} activeStep={activeStep} />
      <section>
        {activeStep === steps.length ? (
          <div>Ya llenó el formulario</div>
        ) : (
          <>{renderStepContent()}</>
        )}
      </section>
    </React.Fragment>
  );
};
