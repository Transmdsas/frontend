import { types } from "../types/Types";

const initialState = {
  drivers: [],
  loading: true,
  buttonProps: {}
};

export const driversReducers = (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET__DRIVERS:
      return {
        ...state,
        drivers: action.payload,
        loading: false,
      };
    case types.GET__CREATE_BUTTON:
      console.log(action.payload);
      return {
        ...state,
        buttonProps: action.payload
      }
    default:
      return state;
  }
};
