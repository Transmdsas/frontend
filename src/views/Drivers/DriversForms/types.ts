import { FormikHelpers, FormikValues } from "formik";

export interface GeneralFormProps<T> {
  formField: {
    firstName: Field;
    lastName: Field;
    documentNumber: Field;
    driverCodeId : Field,
    experienceYears: Field,
    documentTypeId: Field;
    birthDate: Field;
    cellphone: Field;
    email: Field;
    bankCertification: Field;
    bankId: Field;
    address: Field;
    countryId: Field;
    departmentId: Field;
    cityId: Field;
    licenceCategoryId : Field,
    licenceDueDate : Field,
    rut: Field;
    hasActivityRut: Field;
    advancePayment: Field,
    avatar : Field
  };
  onSubmit: (
    values: FormikValues & T,
    actions: FormikHelpers<FormikValues & T>
  ) => void;
}

export interface Field {
  label: string;
  name: string;
}

export interface ContactFormProps {
  driverId: string;
  onCancel: () => void;
  onSuccessSave: () => void;
}

export interface ReferencesFormProps {
  driverId: string;
  onCancel: () => void;
  onSuccessSave: () => void;
}