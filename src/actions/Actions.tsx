import { types } from "../types/Types";

export const setVehicles = (payload: any) => ({
  type: types.GET__VEHICLES,
  payload,
});

export const setButtonProps = (payload: any) => ({
  type: types.GET__CREATE_BUTTON,
  payload
});

export const getDataInRedux = (vehicles: any) => async (dispatch: any) => {
  dispatch(setVehicles(vehicles));
};
