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
