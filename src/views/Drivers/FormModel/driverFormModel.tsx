const driverFormModel = {
  formId: 'driverForm',
  formField: {
    firstName: {
      name: 'firstName',
      label: 'Nombres*',
      requiredErrorMsg: 'Debe ingresar un nombre'
    },
    lastName: {
      name: 'lastName',
      label: 'Apellidos*',
      requiredErrorMsg: 'Debe ingresar al menos un apellido'
    },
    driverCodeId: {
      name: 'driverCodeId',
      label: 'Codigo de conductor*',
      requiredErrorMsg: 'Debe seleccionar el codigo'
    },
    experienceYears: {
      name: 'experienceYears',
      label: 'Años de experiencia',
      invalidErrorMsg: 'Fecha no válida'
    },
    documentTypeId: {
      name: 'documentTypeId',
      label: 'Tipo de Documento*',
      requiredErrorMsg: 'Debe seleccionar el tipo de documento'
    },
    documentNumber: {
      name: 'documentNumber',
      label: 'Número de Documento*',
      requiredErrorMsg: 'Debe ingresar el número de documento',
      invalidErrorMsg: 'Documento no válido (e.j. 12345678)'
    },
    cellphone: {
      name: 'cellphone',
      label: 'Celular',
      invalidErrorMsg: 'El número que intenta ingresar no es válido',
    },
    email: {
      name: 'email',
      label: 'Correo Electrónico',
      invalidErrorMsg: 'Correo electrónico no válido.'
    },
    birthDate: {
      name: 'birthDate',
      label: 'Fecha De Nacimiento',
      invalidErrorMsg: 'Fecha no válida'
    },
    address: {
      name: "address",
      label: "Dirección",
      invalidErrorMsg: 'La dirección debe tener entre 6 y 100 caracteres'
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
    bankCertification: {
      name: 'bankCertification',
      label: 'Certificación Bancaria*',
      requiredErrorMsg: 'Debe seleccionar si posee o no certificación'
    },
    bankId: {
      name: 'bankId',
      label: 'Banco*',
      requiredErrorMsg: 'Debe seleccionar un banco'
    },
    rut: {
      name: 'rut',
      label: 'Rut*',
      requiredErrorMsg: 'Debe seleccionar si posee o no Rut'
    },
    licenceCategoryId: {
      name: 'licenceCategoryId',
      label: 'Categoria de licencia*',
      requiredErrorMsg: 'Debe seleccionar la categoria de la licencia'
    },
    licenceDueDate: {
      name: 'licenceDueDate',
      label: 'Fecha De Expiración de la licencia',
      invalidErrorMsg: 'Fecha no válida'
    },
    hasActivityRut: {
      name: 'hasActivityRut',
      label: 'Rut con actividad*',
      requiredErrorMsg: 'Debe seleccionar si el Rut cuenta con la actividad necesaria'
    },
    balances: {
      name: 'balances',
      label: 'Saldos',
    },
    advances: {
      name: 'advances',
      label: 'Anticipos',
    },
    contractTypeId: {
      name: 'contractTypeId',
      label: 'Tipo de Contrato*',
      requiredErrorMsg: 'Debe seleccionar el tipo de contrato'
    },
    contractDueDate: {
      name: 'contractDueDate',
      label: 'Fecha de Caducidad*',
      requiredErrorMsg: 'Debe seleccionar la fecha de expiración del contrato'
    },
    advancePayment: {
      name: 'advancePayment',
      label: 'Autorización de saldos y anticipos*',
      requiredErrorMsg: 'Debe seleccionar si posee o no Rut'
    },
    contractFile: {
      name: 'contractFile',
      label: 'Cargue contrato',
      requiredErrorMsg: 'Debe cargar evidencia del contrato'
    }
  }
};

export default driverFormModel;