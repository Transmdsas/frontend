import holderFormModel from './driverFormModel';
const {
  formField: {
    firstName,
    lastName,
    driverCodeId,
    experienceYears,
    documentNumber,
    cellphone,
    email,
    birthDate,
    address,
    countryId,
    departmentId,
    cityId,
    bankCertification,
    bankId,
    rut,
    hasActivityRut,
    balances,
    advances,
    contractTypeId,
    contractDueDate,
    contractFile,
    advancePayment
  }
} = holderFormModel;


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    [firstName.name]: '',
    [lastName.name]: '',
    [driverCodeId.name]: '',
    [experienceYears.name]: '',
    [documentNumber.name]: '',
    [cellphone.name]: '',
    [email.name]: '',
    [birthDate.name]: '',
    [address.name]: '',
    [countryId.name]: '',
    [departmentId.name]: '',
    [cityId.name]: '',
    [bankCertification.name]: '',
    [bankId.name]: '',
    [rut.name]: '',
    [hasActivityRut.name]: '',
    [balances.name]: false,
    [advances.name]: false,
    [contractTypeId.name]: '',
    [contractDueDate.name]: '',
    [contractFile.name]: '',
    [advancePayment.name]: ''
};
