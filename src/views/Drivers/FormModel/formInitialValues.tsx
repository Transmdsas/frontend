import driverFormModel from './driverFormModel';
const {
  formField: {
    firstName,
    lastName,
    driverCodeId,
    experienceYears,
    documentTypeId,
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
    advancePayment,
    avatar,
    licenceDueDate,
    licenceCategoryId
  }
} = driverFormModel;


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  [firstName.name]: '',
  [lastName.name]: '',
  [driverCodeId.name]: '',
  [experienceYears.name]: '',
  [documentTypeId.name]: '',
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
  [licenceDueDate.name]: '',
  [advancePayment.name]: '',
  [licenceCategoryId.name]: '',
  [avatar.name]: ''
};
