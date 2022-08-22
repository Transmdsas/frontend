import { types } from "../types/Types";

export const ParametersReducers = (state = [], action: any) => {
  switch (action.type) {
    case types.GET__VEHICLES:
      return {
        ...state,
        vehicles: action.payload,
      };
    default:
      return state;
  }
};
