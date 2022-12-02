import * as Yup from 'yup';
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
    destinations
    


    
  }
} = CustomersFormModel;

 const cellRegEx = /3[0-9]{9}/gm;

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  Yup.object().shape({
    [carPlate.name]: Yup.mixed().required(`${carPlate.requiredErrorMsg}`),
    [driver.name]: Yup.string().required(`${driver.requiredErrorMsg}`),
    [chargeTime.name]: Yup.mixed().required(`${chargeTime.requiredErrorMsg}`),
    [entryDate.name]: Yup.date().required(`${entryDate.requiredErrorMsg}`),
    [departureDate.name]: Yup.date().required(`${departureDate.requiredErrorMsg}`),
    [sender.name]: Yup.string().required(`${sender.requiredErrorMsg}`),
    [loadingPlace.name]: Yup.mixed().required(`${loadingPlace.requiredErrorMsg}`),
    [address.name]: Yup.string().required(`${address.requiredErrorMsg}`),
    [recipients.name]: Yup.mixed().required(`${recipients.requiredErrorMsg}`),
    [downloadPlace.name]: Yup.mixed().required(`${downloadPlace.requiredErrorMsg}`),
    [destinations.name]: Yup.mixed().required(`${destinations.requiredErrorMsg}`),


  }),
  Yup.object().shape({
    // [contractTypeId.name]: Yup.string().required(`${contractTypeId.requiredErrorMsg}`),
    // [contractDueDate.name]: Yup.date().required(`${contractDueDate.requiredErrorMsg}`),
    // [contractFile.name]: Yup.mixed().required(`${contractFile.requiredErrorMsg}`)
  })
];
