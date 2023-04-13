export interface GeneralFormProps {
  formField: {
    customerName : Field;
    documentNumber : Field;
    documentTypeId : Field;
    cellphone : Field;
    email : Field;
    address : Field;
    countryId : Field;
    departmentId : Field;
    cityId  : Field;
  };
}

export interface Field {
  label: string;
  name: string;
}
