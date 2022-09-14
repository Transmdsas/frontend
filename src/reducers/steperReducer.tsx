import { types } from "../types/Types";

const initialState = [
  {
    id: 1,
    step: "Información general del vehículo",
    completed: false,
    disabled: false,
  },
  {
    id: 2,
    step: "Tecnomecánica",
    completed: false,
    disabled: true,
  },
  {
    id: 3,
    step: "pólizas",
    completed: false,
    disabled: true,
  },
  {
    id: 4,
    step: "equipo de comunicaciones",
    completed: false,
    disabled: true,
  },
  {
    id: 5,
    step: "anexos del vehículo",
    completed: false,
    disabled: true,
  },
];

export const SteperReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET__STEPPER:
      return state.map((data: any) => {
        if (data.id === action.payload) {
          return {
            ...data,
            completed: true,
            disabled: false,
          };
        } else {
          return data;
        }
      });
    default:
      return state;
  }
};
