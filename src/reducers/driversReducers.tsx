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
    default:
      return state;
  }
};
