export interface GeneralFormProps {
  formField: {
    carPlate : Field;
    brandId : Field;
    vehicleTypeId : Field;
    vehicleCodeId : Field;
    lineId : Field;
    bodyWorkId : Field;
    color : Field;
    modelYear : Field;
    serialNumber : Field;
    netWeight : Field;
    emptyWeight : Field;
    repoweredTo : Field;
    axles : Field;
    destinations : Field;
    fuelType : Field;
  };
}

export interface Field {
  label: string;
  name: string;
}
