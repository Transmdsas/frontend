export interface GeneralFormProps {
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
}

export interface Field {
  label: string;
  name: string;
}
