import { types } from "../types/Types";

const initialState = {
  parameters: [],
  loading: true,
};

export const ParametersReducers = (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET__PARAMETERS:
      return {
        ...state,
        parameters: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
