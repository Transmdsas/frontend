const parametersConfigFormModel = {
  formId: "parametersConfigModel",
  formField: {
    id: {
      name: "id",
      label: "Parametro*",
      requiredErrorMsg: "Debe seleccionar tipo de configuración",
    },
    referenceCodeId: {
      name: "referenceCodeId",
      label: "Código de referencia",
      requiredErrorMsg: "Debe seleccionar el código de referencia",
    },
    isActive: {
      name: "isActive",
      label: "Activo*",
    },
  },
};

export default parametersConfigFormModel;
