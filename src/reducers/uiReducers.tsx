import { types } from "../types/Types";

const initialState = {
  buttonProps: {}
};

export const uiReducers = (state = initialState, action: any) => {
    switch (action.type) {
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
  