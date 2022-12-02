import CustomerFormModel from './customerFormModel';
const {
  formField: {
    businessName,
    documentTypeId,
    documentNumber,
    cellphone,
    email,
    birthDate,
    address,
    countryId,
  

  }
} = CustomerFormModel;


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    [businessName.name]: '',
    [documentTypeId.name]: '',
    [documentNumber.name]: '',
    [documentNumber.name]: '',
    [cellphone.name]: '',
    [email.name]: '',
    [birthDate.name]: '',
    [address.name]: '',
    [countryId.name]: '',


};
