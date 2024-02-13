import * as Yup from "yup";
import driverFormModel from "./driverFormModel";
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
    licenceCategoryId,
    licenceDueDate,
    advancePayment,
    avatar,
  },
} = driverFormModel;

const cellRegEx = /3[0-9]{9}/gm;

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  Yup.object().shape({
    [firstName.name]: Yup.string().required(`${firstName.requiredErrorMsg}`),
    [lastName.name]: Yup.string().required(`${lastName.requiredErrorMsg}`),
    [documentTypeId.name]: Yup.string().required(
      `${documentTypeId.requiredErrorMsg}`
    ),
    [driverCodeId.name]: Yup.string().required(
      `${documentTypeId.requiredErrorMsg}`
    ),
    [documentNumber.name]: Yup.string().required(
      `${documentNumber.requiredErrorMsg}`
    ),
    [cellphone.name]: Yup.string()
      .nullable()
      .matches(cellRegEx, `${cellphone.invalidErrorMsg}`),
    [email.name]: Yup.string().nullable().email(`${email.invalidErrorMsg}`),
    [birthDate.name]: Yup.date(),
    [experienceYears.name]: Yup.string(),
    [address.name]: Yup.string()
      .min(6, `${address.invalidErrorMsg}`)
      .max(100, `${address.invalidErrorMsg}`),
    [countryId.name]: Yup.string()
      .nullable()
      .required(`${countryId.requiredErrorMsg}`),
    [departmentId.name]: Yup.string()
      .nullable()
      .required(`${departmentId.requiredErrorMsg}`),
    [cityId.name]: Yup.string()
      .nullable()
      .required(`${cityId.requiredErrorMsg}`),
    [bankCertification.name]: Yup.string()
      .nullable()
      .required(`${bankCertification.requiredErrorMsg}`),
    [bankId.name]: Yup.string().nullable(),
    [rut.name]: Yup.string()
      .nullable()
      .when(bankCertification.name, {
        is: (val: string) => val !== "3",
        then: Yup.string().required(`${rut.requiredErrorMsg}`),
      }),
    [licenceCategoryId.name]: Yup.string()
      .nullable()
      .required(`${licenceCategoryId.requiredErrorMsg}`),
    [advancePayment.name]: Yup.string()
      .nullable()
      .required(`${advancePayment.requiredErrorMsg}`),
    [licenceDueDate.name]: Yup.date(),
    [hasActivityRut.name]: Yup.string()
      .nullable()
      .when(bankCertification.name, {
        is: (val: string) => val !== "3",
        then: Yup.string().required(`${hasActivityRut.requiredErrorMsg}`),
      }),
    [avatar.name]: Yup.mixed()
      .required(`${avatar.requiredErrorMsg}`)
      .test(
        "fileFormat",
        "Solo se permiten imágenes en formato JPEG o PNG",
        (value) =>
          value ? ["image/jpeg", "image/png"].includes(value.type) : true
      )
      .test(
        "fileSize",
        "La imagen es demasiado grande, el tamaño máximo permitido es de 5MB",
        (value) => (value ? value.size <= 5 * 1024 * 1024 : true)
      ),
  }),
];
