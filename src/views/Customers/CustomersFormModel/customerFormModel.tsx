const CustomersFormModel = {
  formId: 'CustomersForm',
  formField: {
    businessName: {
      name: 'customerName',
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
    countryId: {
      name: 'countryId',
      label: 'País*',
      requiredErrorMsg: 'Debe seleccionar el país'
    },
    departmentId: {
      name: 'departmentId',
      label: 'Departamento*',
      requiredErrorMsg: 'Debe seleccionar el departamento'
    },
    cityId: {
      name: 'cityId',
      label: 'Ciudad*',
      requiredErrorMsg: 'Debe seleccionar la ciudad'
    },
    address: {
      name: 'address',
      label: 'Dirección*',
      requiredErrorMsg: 'Debe ingresar una dirección'
    },
  }
};

export default CustomersFormModel;

