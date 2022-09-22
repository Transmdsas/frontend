import { types } from "../types/Types";

export const setVehicles = (payload: any) => ({
  type: types.GET__VEHICLES,
  payload,
});

export const setCurrentVehicleSetUp = (payload: any) => ({
  type: types.SET__CURRENT__VEHICLE__SETUP,
  payload,
});

export const setParameters = (payload: any) => ({
  type: types.GET__PARAMETERS,
  payload,
});

export const setButtonProps = (payload: any) => ({
  type: types.GET__CREATE_BUTTON,
  payload,
});

export const setStepperUI = (payload: any) => ({
  type: types.GET__STEPPER,
  payload,
});
export const setNextStep = (payload: any) => ({
  type: types.SET__STEPPER__NEXT,
  payload,
});

export const changeNextStep = (step: any) => async (dispatch: any) => {
  dispatch(setStepperUI(step));
  dispatch(setNextStep(step + 1));
};

export const setLoading = (payload: any) => ({
  type: types.GET__LOADING,
  payload,
});

export const getDataInRedux =
  (
    vehicles: any,
    parameters: any,
    parametersResponseBrandId: any,
    parametersResponseVehicleTypeId: any,
    parametersResponseLineId: any,
    parametersIds: any,
    countriesIds: any,
    countries: any
  ) =>
  async (dispatch: any) => {
    await dispatch(setVehicles(vehicles));
    await dispatch(
      setParameters({
        parameters,
        parametersResponseBrandId,
        parametersResponseVehicleTypeId,
        parametersResponseLineId,
        parametersIds,
        countriesIds,
        countries,
      })
    );
    dispatch(setLoading(false));
  };
