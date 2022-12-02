const CustomersFormModel = {
  formId: 'CustomersForm',
  formField: {
    businessName: {
      name: 'businessName',
      label: 'Razón Social*',
      requiredErrorMsg: 'Debe ingresar la razón social del cliente'
    },
    documentTypeId: {
      name: 'documentTypeId',
      label: 'Tipo de documento*',
      requiredErrorMsg: 'Debe ingresar el tipó de documento'
    },
    documentNumber: {
      name: 'documentNumber',
      label: 'Numero de documento*',
      requiredErrorMsg: 'Debe ingresar Numero del documento'
    },    
    cellphone: {
      name: 'cellphone',
      label: 'Celular*',
      requiredErrorMsg: 'Debe ingresar  el numero de celular'
    },
    email: {
      name: 'email',
      label: 'Email*',
      requiredErrorMsg: 'Debe ingresar el email del cliente'
    },
    birthDate: {
      name: 'birthDate',
      label: 'Fecha de creación*',
      requiredErrorMsg: 'Debe ingresar la fecha de creación'
    },
    countryId: {
      name: 'countryId',
      label: 'País*',
      requiredErrorMsg: 'Debe ingresar el País'
    },
    address: {
      name: 'address',
      label: 'Dirección*',
      requiredErrorMsg: 'Debe ingresar una dirección'
    },
  }
};

export default CustomersFormModel;

