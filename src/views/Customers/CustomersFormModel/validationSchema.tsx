import * as Yup from 'yup';
import CustomersFormModel from './customerFormModel';
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
    cityId,
  }
} = CustomersFormModel;

 const cellRegEx = /3[0-9]{9}/gm;

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  Yup.object().shape({
    [customerName.name]: Yup.string().required(`${customerName.requiredErrorMsg}`),
    [documentTypeId.name]: Yup.string().required(`${documentTypeId.requiredErrorMsg}`),
    [documentNumber.name]: Yup.mixed().required(`${documentNumber.requiredErrorMsg}`),
    [cellphone.name]: Yup.date().required(`${cellphone.requiredErrorMsg}`),
    [email.name]: Yup.string().email().required(`${email.requiredErrorMsg}`),
    [address.name]: Yup.string().required(`${address.requiredErrorMsg}`),
    [countryId.name]: Yup.string().nullable().required(`${countryId.requiredErrorMsg}`),
    [departmentId.name]: Yup.string().nullable().required(`${departmentId.requiredErrorMsg}`),
    [cityId.name]: Yup.string().nullable().required(`${cityId.requiredErrorMsg}`),



  }),
  Yup.object().shape({
    // [contractTypeId.name]: Yup.string().required(`${contractTypeId.requiredErrorMsg}`),
    // [contractDueDate.name]: Yup.date().required(`${contractDueDate.requiredErrorMsg}`),
    // [contractFile.name]: Yup.mixed().required(`${contractFile.requiredErrorMsg}`)
  })
];
