import { FormikHelpers, FormikValues } from "formik";

export interface GeneralFormProps<T> {
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
    propertyCard: Field;
    fuelTypeId : Field;
    countryId: Field;
    frontPhoto: Field;
    backPhoto: Field;
    rightPhoto: Field;
    leftPhoto: Field;
    destinations: Field;
  };
  onSubmit: (
    values: FormikValues & T,
    actions: FormikHelpers<FormikValues & T>
  ) => void;
}

export interface Field {
  label: string;
  name: string;
}
