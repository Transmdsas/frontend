import * as Yup from 'yup';
import vehiclesFormModel from './vehicleFormModel';
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
    destinations,
    numberTargetPropiety,
    


    
  }
} = vehiclesFormModel;

 const cellRegEx = /3[0-9]{9}/gm;

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  Yup.object().shape({
    [carPlate.name]: Yup.mixed().required(`${carPlate.requiredErrorMsg}`),
    [brandId.name]: Yup.string().required(`${brandId.requiredErrorMsg}`),
    [vehicleTypeId.name]: Yup.string().required(`${vehicleTypeId.requiredErrorMsg}`),
    [vehicleCodeId.name]: Yup.string().required(`${vehicleCodeId.requiredErrorMsg}`),
    [lineId.name]: Yup.string().required(`${lineId.requiredErrorMsg}`),
    [bodyWorkId.name]: Yup.string().required(`${bodyWorkId.requiredErrorMsg}`),
    [color.name]: Yup.string().required(`${color.requiredErrorMsg}`),
    [modelYear.name]: Yup.date().required(`${modelYear.requiredErrorMsg}`),
    [serialNumber.name]: Yup.string().required(`${serialNumber.requiredErrorMsg}`),
    [netWeight.name]: Yup.string().required(`${netWeight.requiredErrorMsg}`),
    [emptyWeight.name]: Yup.string().required(`${emptyWeight.requiredErrorMsg}`),
    [repoweredTo.name]: Yup.string().required(`${repoweredTo.requiredErrorMsg}`),
    [axles.name]: Yup.string().required(`${axles.requiredErrorMsg}`),
    [destinations.name]: Yup.string().required(`${destinations.requiredErrorMsg}`),
    [numberTargetPropiety.name]: Yup.string().required(`${numberTargetPropiety.requiredErrorMsg}`),

  }),
  Yup.object().shape({
    // [contractTypeId.name]: Yup.string().required(`${contractTypeId.requiredErrorMsg}`),
    // [contractDueDate.name]: Yup.date().required(`${contractDueDate.requiredErrorMsg}`),
    // [contractFile.name]: Yup.mixed().required(`${contractFile.requiredErrorMsg}`)
  })
];
