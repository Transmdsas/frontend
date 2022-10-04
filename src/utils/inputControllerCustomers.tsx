import { fileType, inputTypes } from "../types/Types";
import { useSelector } from "react-redux";
import { ParametersReducers } from "../reducers/parametersReducers";
import { useEffect } from "react";

export const InputControllerCustomers = () => {
  const store = useSelector((state: any) => state);

  const inputs = {
    createCustomers: [
      {
        label: "Razón Social",
        name: "firstName",
        characterMinimun: 10,
        kind: inputTypes.input,
        size: 3,
      },
      {
        label: "NIT",
        name: "documentNumber",
        verifyIfnotRepeated: true,
        fileIs: fileType.number,
        kind: inputTypes.input,
        size: 3,
      },
      {
        label: "Télefono",
        name: "cellphone",
        fileIs: fileType.number,
        kind: inputTypes.input,
        characterMinimun: 7,
        characterMaximum: 10,
        size: 3,
      },
      {
        label: "Email",
        name: "email",
        fileIs: fileType.mail,
        kind: inputTypes.input,
        characterMinimun: 6,
        size: 3,
      },
      {
        label: "Dirección",
        name: "address",
        kind: inputTypes.input,
        characterMinimun: 6,
        size: 3,
      },
      {
        label: "País",
        name: "countryId",
        kind: inputTypes.select,
        size: 3,
        dropdownValues: [
          {
            value: 1,
            label: "Colombia",
          },
          {
            value: 2,
            label: "Ecuador",
          },
        ],
      },
      {
        label: "Departamento",
        name: "departmentId",
        kind: inputTypes.select,
        enabledAfter: "countryId",
        size: 3,
        dropdownValues: [
          {
            value: 1,
            label: "Cundinamarca",
          },
          {
            value: 2,
            label: "Meta",
          },
        ],
      },
      {
        label: "Ciudad",
        name: "cityId",
        kind: inputTypes.select,
        enabledAfter: "departmentId",
        size: 3,
        dropdownValues: [
          {
            value: 1,
            label: "Bogotá",
          },
          {
            value: 2,
            label: "Chía",
          },
        ],
      },
      
      {
        label: "Observaciones",
        name: "observations",
        kind: inputTypes.multiline,
        size: 9,
        rows: 5,
      },
    ],
  };
  return inputs;
};
