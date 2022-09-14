import { fileType, inputTypes } from "../types/Types";
import { useSelector } from "react-redux";
import { ParametersReducers } from "../reducers/parametersReducers";
import { useEffect } from "react";

export const TecnomecanicaController = () => {
  // const store = useSelector((state: any) => state);

  const inputs = {
    tecnomecanica: [
      {
        label: "Numero de control",
        name: "controlNumber",
        kind: inputTypes.input,
        size: 6,
      },
      {
        label: "Numero de consecutivo RUNT",
        name: "runtNumber",
        kind: inputTypes.input,
        size: 6,
      },
      {
        label: "Fecha de vencimiento",
        name: "dueDate",
        kind: inputTypes.calendar,
        size: 6,
      },
      {
        label: "TCentro de diagnóstico Automotriz",
        name: "diagnosticCenterId",
        kind: inputTypes.select,
        size: 6,
        dropdownValues: [
          {
            value: 1,
            label: "Pick Up",
          },
          {
            value: 2,
            label: "Camion",
          },
        ],
      },
    ],
  };
  return inputs;
};
