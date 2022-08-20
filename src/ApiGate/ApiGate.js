import axios from "axios";

const URL =
  process.env.REACT_APP_TRANSMDAPI || "https://transmd.herokuapp.com/api/v1/";

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

  return {
    VehiclesResponse,
    parametersResponse,
  };
};
