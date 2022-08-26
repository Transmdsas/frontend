import { types } from "../types/Types";

const initialState = {
  inputs: [],
};

export const InputsReducers = (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET__INPUTS:
      return {
        ...state,
        inputs: action.payload,
      };
    default:
      return state;
  }
};
