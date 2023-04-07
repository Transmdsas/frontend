import * as Yup from 'yup';
import CustomersFormModel from './customerFormModel';
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
} = CustomersFormModel;

 const cellRegEx = /3[0-9]{9}/gm;

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  Yup.object().shape({
    [businessName.name]: Yup.mixed().required(`${businessName.requiredErrorMsg}`),
    [documentTypeId.name]: Yup.string().required(`${documentTypeId.requiredErrorMsg}`),
    [documentNumber.name]: Yup.mixed().required(`${documentNumber.requiredErrorMsg}`),
    [cellphone.name]: Yup.date().required(`${cellphone.requiredErrorMsg}`),
    [email.name]: Yup.string().email().required(`${email.requiredErrorMsg}`),
    [birthDate.name]: Yup.string().required(`${birthDate.requiredErrorMsg}`),
    [address.name]: Yup.string().required(`${address.requiredErrorMsg}`),
    [countryId.name]: Yup.mixed().required(`${countryId.requiredErrorMsg}`),



  }),
  Yup.object().shape({
    // [contractTypeId.name]: Yup.string().required(`${contractTypeId.requiredErrorMsg}`),
    // [contractDueDate.name]: Yup.date().required(`${contractDueDate.requiredErrorMsg}`),
    // [contractFile.name]: Yup.mixed().required(`${contractFile.requiredErrorMsg}`)
  })
];
