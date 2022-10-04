import { fileType, inputTypes } from "../types/Types";

export const InputControllerOrders = () => {
  const inputs = {
    createOrders: [
      {
            label: "PLACA",
            name: "countryId",
            kind: inputTypes.select,
            size: 3,
            dropdownValues: [
              {
                value: 1,
                label: "BPM87D",
              },
              {
                value: 2,
                label: "XZL78E",
              },
            ],
        },
        {
            label: "CONDUCTOR",
            name: "countryId",
            kind: inputTypes.select,
            size: 3,
            dropdownValues: [
              {
                value: 1,
                label: "BPM87D",
              },
              {
                value: 2,
                label: "XZL78E",
              },
            ],
        },
        {
            label: "HORA DEL CARGUE",
            name: "documentNumber",
            verifyIfnotRepeated: true,
            fileIs: fileType.number,
            kind: inputTypes.input,
            size: 3,
          },
      {
        label: "FECHA DE ENTRADA/SALIDA",
        name: "birthDate",
        characterMinimun: 3,
        kind: inputTypes.input,
        size: 3,
      },
      {
        label: "Remitente",
        name: "countryId",
        kind: inputTypes.select,
        size: 4,
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
        label: "Lugar del cargue",
        name: "countryId",
        kind: inputTypes.select,
        size: 4,
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
        label: "Dirección",
        name: "address",
        kind: inputTypes.input,
        characterMinimun: 6,
        size: 4,
      },
      {
        label: "Destinatario",
        name: "departmentId",
        kind: inputTypes.select,
        enabledAfter: "countryId",
        size: 4,
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
        label: "Lugar De Descargue",
        name: "cityId",
        kind: inputTypes.select,
        enabledAfter: "departmentId",
        size: 4,
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
        label: "Destinos",
        name: "destinations",
        fileIs: fileType.array,
        kind: inputTypes.multipleSelections,
        enabledAfter: "CountryId",
        size: 4,
        dropdownValues: [
          {
            value: 1,
            label: "dep1",
          },
          {
            value: 2,
            label: "dep2",
          },
          {
            value: 3,
            label: "dep3",
          },
          {
            value: 4,
            label: "dep4",
          },
          {
            value: 5,
            label: "dep5",
          },
          {
            value: 6,
            label: "dep6",
          },
        ],
      },
    ],
  };
  return inputs;
};