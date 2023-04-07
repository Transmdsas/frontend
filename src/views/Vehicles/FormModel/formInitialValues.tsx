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
    fuelType    

  }
} = vehiclesFormModel;


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    [carPlate.name]: '',
    [brandId.name]: '',
    [vehicleTypeId.name]: '',
    [vehicleCodeId.name]: '',
    [lineId.name]: '',
    [bodyWorkId.name]: '',
    [color.name]: '',
    [modelYear.name]: '',
    [serialNumber.name]: '',
    [netWeight.name]: '',
    [emptyWeight.name]: '',
    [repoweredTo.name]: '',
    [axles.name]: '',
    [destinations.name]: '',
    [fuelType.name]: '',

};
