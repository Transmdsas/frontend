export interface ParametersConfigFormProps {
  formField: {
    id: Field;
    referenceCodeId: Field;
    isActive: Field;
  };
}

export interface Field {
  label: string;
  name: string;
}
