import * as Yup from "yup";
import vehiclesFormModel from "./vehicleFormModel";
const {
  formField: {
    carPlate,
    brandId,
    vehicleTypeId,
    vehicleCodeId,
    lineId,
    bodyWorkId,
    color,
    modelYear,
    serialNumber,
    netWeight,
    emptyWeight,
    repoweredTo,
    axles,
    propertyCard,
    fuelTypeId,
    countryId,
    frontPhoto,
    backPhoto,
    rightPhoto,
    leftPhoto,
  },
} = vehiclesFormModel;

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  Yup.object().shape({
    [carPlate.name]: Yup.mixed().required(`${carPlate.requiredErrorMsg}`),
    [brandId.name]: Yup.string().nullable().required(`${brandId.requiredErrorMsg}`),
    [vehicleTypeId.name]: Yup.string().required(
      `${vehicleTypeId.requiredErrorMsg}`
    ),
    [vehicleCodeId.name]: Yup.string().nullable().required(
      `${vehicleCodeId.requiredErrorMsg}`
    ),
    [lineId.name]: Yup.string().nullable().required(`${lineId.requiredErrorMsg}`),
    [bodyWorkId.name]: Yup.string().nullable().required(`${bodyWorkId.requiredErrorMsg}`),
    [color.name]: Yup.string().required(`${color.requiredErrorMsg}`),
    [modelYear.name]: Yup.string().required(`${modelYear.requiredErrorMsg}`),
    [serialNumber.name]: Yup.string().required(
      `${serialNumber.requiredErrorMsg}`
    ),
    [netWeight.name]: Yup.string().required(`${netWeight.requiredErrorMsg}`),
    [emptyWeight.name]: Yup.string().required(
      `${emptyWeight.requiredErrorMsg}`
    ),
    [repoweredTo.name]: Yup.string().required(
      `${repoweredTo.requiredErrorMsg}`
    ),
    [axles.name]: Yup.string().required(`${axles.requiredErrorMsg}`),
    [propertyCard.name]: Yup.string().required(
      `${propertyCard.requiredErrorMsg}`
    ),
    [fuelTypeId.name]: Yup.string().nullable().required(`${fuelTypeId.requiredErrorMsg}`),
    [countryId.name]: Yup.string()
    .nullable()
    .required(`${countryId.requiredErrorMsg}`),
    [frontPhoto.name]: Yup.mixed()
      .required(`${frontPhoto.requiredErrorMsg}`)
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
      [backPhoto.name]: Yup.mixed()
      .nullable()
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
      [rightPhoto.name]: Yup.mixed()
      .nullable()
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
      [leftPhoto.name]: Yup.mixed()
      .nullable()
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
