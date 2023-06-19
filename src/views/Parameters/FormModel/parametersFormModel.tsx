const ParametersFormModel = {
  formId: "ParametersModel",
  formField: {
    configTypeId: {
      name: "configTypeId",
      label: "Tipo de configuración*",
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

export default ParametersFormModel;
