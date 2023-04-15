export interface GeneralFormProps {
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
}

export interface Field {
  label: string;
  name: string;
}
