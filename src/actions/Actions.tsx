import { types } from "../types/Types";

export const setVehicles = (payload: any) => ({
  type: types.GET__VEHICLES,
  payload,
});

export const getDataInRedux = (vehicles: any) => async (dispatch: any) => {
  dispatch(setVehicles(vehicles));
};
