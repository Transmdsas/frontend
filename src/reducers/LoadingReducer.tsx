import { types } from "../types/Types";

export const LoadingReducer = (state = true, action: any) => {
  switch (action.type) {
    case types.GET__LOADING:
      return (state = action.payload);
    default:
      return state;
  }
};
