import React, { useState } from "react";
import { vehiclesStepperInitialState } from "../utils/StepperController";

export const ContextStore: any = () => {
  const [vehiclesStepper, setVehiclesStepper] = useState(
    vehiclesStepperInitialState
  );
  return {
    vehiclesStepper,
    setVehiclesStepper,
  };
};
