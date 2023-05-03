import { FormikHelpers, FormikValues } from "formik";

export interface GeneralFormProps<T> {
  formField: {
    firstName: Field;
    lastName: Field;
    documentTypeId: Field;
    documentNumber: Field;
    cellphone: Field;
    email: Field;
    birthDate: Field;
    address: Field;
    countryId: Field;
    departmentId: Field;
    cityId: Field;
    bankCertification: Field;
    bankId: Field;
    rut: Field;
    hasActivityRut: Field;
    balances: Field;
    advances: Field;
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

export interface ContractFormProps<T> {
  formField: {
    contractTypeId: Field;
    contractDueDate: Field;
    contractFile: Field;
  };
  onSubmit: (
    values: FormikValues & T,
    actions: FormikHelpers<FormikValues & T>
  ) => void;
  onCancel: () => void;
}