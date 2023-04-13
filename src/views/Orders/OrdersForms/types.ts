export interface GeneralFormProps {
  formField: {
    carPlate : Field;
    driver : Field;
    chargeTime: Field;
    entryDate : Field;
    departureDate: Field;
    sender : Field;
    loadingPlace: Field;
    address: Field;
    recipients: Field;
    downloadPlace : Field;
    destinations : Field;
  };
}

export interface Field {
  label: string;
  name: string;
}
