export interface ParametersFormProps {
  formField: {
    configTypeId: Field;
    referenceCodeId: Field;
    isActive: Field;
  };
}

export interface Field {
  label: string;
  name: string;
}
