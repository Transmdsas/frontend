import { types } from "../types/Types";

const initialState = {
  drivers: [],
  loading: true,
  buttonProps: {}
};

export const ownerReducers = (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET__OWNERS:
      return {
        ...state,
        drivers: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
