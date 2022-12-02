import CustomersFormModel from './orderFormModel';
const {
  formField: {
    carPlate,
    driver,
    chargeTime,
    entryDate,
    departureDate,
    sender,
    loadingPlace,
    address,
    recipients,
    downloadPlace,
    destinations,
  

  }
} = CustomersFormModel;


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    [carPlate.name]: '',
    [driver.name]: '',
    [chargeTime.name]: '',
    [entryDate.name]: '',
    [departureDate.name]: '',
    [sender.name]: '',
    [loadingPlace.name]: '',
    [address.name]: '',
    [recipients.name]: '',
    [downloadPlace.name]: '',
    [destinations.name]: '',


};
