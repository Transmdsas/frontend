import { types } from "../types/Types";

const initialState = [
  {
    id: 1,
    step: "Información general del vehículo",
    completed: false,
    disabled: false,
    selected: true,
    link: "/crear-vehiculo",
  },
  {
    id: 2,
    step: "Tecnomecánica",
    completed: false,
    disabled: true,
    selected: false,
    link: "/tecnomecanica",
  },
  {
    id: 3,
    step: "pólizas",
    completed: false,
    disabled: true,
    selected: false,
    link: "/polizas",
  },
  {
    id: 4,
    step: "equipo de comunicaciones",
    completed: false,
    disabled: true,
    selected: false,
    link: "/equipo-de-comunicaciones",
  },
  {
    id: 5,
    step: "anexos del vehículo",
    completed: false,
    disabled: true,
    selected: false,
    link: "/anexos-del-vehiculo",
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
            selected: false,
          };
        } else {
          return data;
        }
      });
    case types.SET__STEPPER__NEXT:
      return state.map((data: any) => {
        if (data.id === action.payload) {
          return {
            ...data,
            completed: false,
            disabled: false,
            selected: true,
          };
        } else {
          return data;
        }
      });
    default:
      return state;
  }
};
