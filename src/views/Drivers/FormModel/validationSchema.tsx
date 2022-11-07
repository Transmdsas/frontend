import * as Yup from 'yup';
import holderFormModel from './driverFormModel';
const {
  formField: {
    firstName,
    lastName,
    driverCodeId,
    documentTypeId,
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
    licenceCategoryId,
    licenceDueDate,
    advancePayment
  }
} = holderFormModel;

const cellRegEx = /3[0-9]{9}/gm;

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  Yup.object().shape({
    [firstName.name]: Yup.string().required(`${firstName.requiredErrorMsg}`),
    [lastName.name]: Yup.string().required(`${lastName.requiredErrorMsg}`),
    [documentTypeId.name]: Yup.string().required(`${documentTypeId.requiredErrorMsg}`),
    [driverCodeId.name]: Yup.string().required(`${documentTypeId.requiredErrorMsg}`),
    [documentNumber.name]: Yup.string().required(`${documentNumber.requiredErrorMsg}`),
    [cellphone.name]: Yup.string().nullable().matches(cellRegEx, `${cellphone.invalidErrorMsg}`),
    [email.name]: Yup.string().nullable().email(`${email.invalidErrorMsg}`),
    [birthDate.name]: Yup.date(),
    [experienceYears.name]: Yup.date(),
    [address.name]: Yup.string().min(6, `${address.invalidErrorMsg}`).max(100,`${address.invalidErrorMsg}`),
    [countryId.name]: Yup.string().nullable().required(`${countryId.requiredErrorMsg}`),
    [departmentId.name]: Yup.string().nullable().required(`${departmentId.requiredErrorMsg}`),
    [cityId.name]: Yup.string().nullable().required(`${cityId.requiredErrorMsg}`),
    [bankCertification.name]: Yup.string().nullable().required(`${bankCertification.requiredErrorMsg}`),
    [bankId.name]: Yup.string().nullable(),
    [rut.name]: Yup.string().nullable().required(`${rut.requiredErrorMsg}`),
    [licenceCategoryId.name]: Yup.string().nullable().required(`${rut.requiredErrorMsg}`),
    [advancePayment.name]: Yup.string().nullable().required(`${rut.requiredErrorMsg}`),
    [licenceDueDate.name]: Yup.date(),
    [hasActivityRut.name]: Yup.string().nullable().required(`${hasActivityRut.requiredErrorMsg}`),
    [balances.name]: Yup.boolean().default(false),
    [advances.name]: Yup.boolean().default(false),
  }),
  Yup.object().shape({
    [contractTypeId.name]: Yup.string().required(`${contractTypeId.requiredErrorMsg}`),
    [contractDueDate.name]: Yup.date().required(`${contractDueDate.requiredErrorMsg}`),
    [contractFile.name]: Yup.mixed().required(`${contractFile.requiredErrorMsg}`)
  })
];
