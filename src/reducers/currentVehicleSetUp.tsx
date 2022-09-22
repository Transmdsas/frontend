import React from "react";
import { types } from "../types/Types";

export const currentVehicleSetUp = (state = {}, action: any) => {
  switch (action.type) {
    case types.SET__CURRENT__VEHICLE__SETUP:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
