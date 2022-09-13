import { types } from "../types/Types";

export const setVehicles = (payload: any) => ({
  type: types.GET__VEHICLES,
  payload,
});

export const setDrivers = (payload: any) => ({
  type: types.GET__DRIVERS,
  payload
});

export const setParameters = (payload: any) => ({
  type: types.GET__PARAMETERS,
  payload,
});

export const setButtonProps = (payload: any) => ({
  type: types.GET__CREATE_BUTTON,
  payload,
});

export const getDataInRedux =
  (
    vehicles: any,
    parameters: any,
    parametersResponseBrandId: any,
    parametersResponseVehicleTypeId: any,
    parametersResponseLineId: any,
    drivers: any
  ) =>
  async (dispatch: any) => {
    dispatch(setVehicles(vehicles));
    dispatch(
      setParameters({
        parameters,
        parametersResponseBrandId,
        parametersResponseVehicleTypeId,
        parametersResponseLineId,
      })
    );
    dispatch(setDrivers(drivers));
  };
