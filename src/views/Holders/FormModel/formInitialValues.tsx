import holderFormModel from './holderFormModel';
const {
  formField: {
    firstName,
    lastName,
    documentTypeId,
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
    contractFile
  }
} = holderFormModel;


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    [firstName.name]: '',
    [lastName.name]: '',
    [documentTypeId.name]: '',
    [documentNumber.name]: '',
    [cellphone.name]: '',
    [email.name]: '',
    [birthDate.name]: null,
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
    [contractFile.name]: ''
};
