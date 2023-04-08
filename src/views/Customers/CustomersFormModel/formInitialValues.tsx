import CustomerFormModel from './customerFormModel';
const {
  formField: {
    customerName,
    documentTypeId,
    documentNumber,
    cellphone,
    email,
    address,
    countryId,
    departmentId,
    cityId
    
  

  }
} = CustomerFormModel;


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    [customerName.name]: '',
    [documentTypeId.name]: '',
    [documentNumber.name]: '',
    [documentNumber.name]: '',
    [cellphone.name]: '',
    [email.name]: '',
    [address.name]: '',
    [countryId.name]: '1',
    [departmentId.name]: '',
    [cityId.name]: '',


};
