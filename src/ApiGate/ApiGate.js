import axios from "axios";

const URL = "https://transmd.herokuapp.com/api/v1/";

const instance = axios.create({
  baseURL: URL,
});

export const ApiGate = async () => {
  const VehiclesResponse = await instance
    .get("vehicles")
    .then((resp) => resp.data)
    .catch((error) => console.log(error));
  const parametersResponse = await instance
    .get("parameters")
    .then((resp) => resp.data)
    .catch((error) => console.log(error));
  const parametersResponseBrandId = await instance
    .get("parameters/1")
    .then((resp) => resp.data)
    .catch((error) => console.log(error));
  const parametersResponseVehicleTypeId = await instance
    .get("parameters/2")
    .then((resp) => resp.data)
    .catch((error) => console.log(error));
  const parametersResponseLineId = await instance
    .get("parameters/3")
    .then((resp) => resp.data)
    .catch((error) => console.log(error));

  const driversResponse = await instance
    .get("drivers")
    .then((resp) => resp.data)
    .catch((error) => console.log(error));

  return {
    VehiclesResponse,
    parametersResponse,
    parametersResponseBrandId,
    parametersResponseVehicleTypeId,
    parametersResponseLineId,
    driversResponse
  };
};
