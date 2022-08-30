import { types } from "../types/Types";

export const setVehicles = (payload: any) => ({
  type: types.GET__VEHICLES,
  payload,
});
export const setParameters = (payload: any) => ({
  type: types.GET__PARAMETERS,
  payload,
});

export const getDataInRedux =
  (vehicles: any, parameters: any) => async (dispatch: any) => {
    dispatch(setVehicles(vehicles));
    dispatch(setParameters(parameters));
  };
