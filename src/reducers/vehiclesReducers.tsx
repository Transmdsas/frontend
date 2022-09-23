import { types } from "../types/Types";

const initialState = {
  vehicles: [],
  loading: true,
  buttonProps: {}
};

export const vehiclesReducers = (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET__VEHICLES:
      return {
        ...state,
        vehicles: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
