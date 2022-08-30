import { inputTypes } from "../types/Types";
import { useSelector } from "react-redux";

export const InputsControllers = () => {
  const store = useSelector((state: any) => state);
  console.log(store);

  const inputs = {
    createVehicles: [
      {
        label: "Placa",
        name: "carPlate",
        kind: inputTypes.input,
        size: 3,
      },
      {
        label: "Marca",
        name: "brandId",
        kind: inputTypes.select,
        size: 3,
        dropdownValues: [
          {
            value: 1,
            label: "Mercedes",
          },
          {
            value: 2,
            label: "Volvo",
          },
        ],
      },
      {
        label: "Tipo de vehiculo",
        name: "vehicleTypeId",
        kind: inputTypes.select,
        size: 3,
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
      {
        label: "Línea",
        name: "lineId",
        kind: inputTypes.input,
        size: 3,
      },
      {
        label: "Tipo de carroceria",
        name: "bodyWorkId",
        kind: inputTypes.select,
        size: 3,
        dropdownValues: [
          {
            value: 1,
            label: "Mercedes",
          },
          {
            value: 2,
            label: "Volvo",
          },
        ],
      },
      {
        label: "Color",
        name: "color",
        kind: inputTypes.select,
        size: 3,
        dropdownValues: [
          {
            value: 1,
            label: "Mercedes",
          },
          {
            value: 2,
            label: "Volvo",
          },
        ],
      },
      {
        label: "Modelo (Año)",
        name: "modelYear",
        kind: inputTypes.select,
        size: 3,
        dropdownValues: [
          {
            value: 2010,
            label: 2010,
          },
          {
            value: 2020,
            label: 2020,
          },
        ],
      },
      {
        label: "Numero de serie",
        name: "serialNumber",
        kind: inputTypes.input,
        size: 3,
      },
      {
        label: "Peso neto vehicular (kg)",
        name: "netWeight",
        kind: inputTypes.input,
        size: 3,
      },
      {
        label: "Peso vacio (kg)",
        name: "emptyWeigth",
        kind: inputTypes.input,
        size: 3,
      },
      {
        label: "Repotenciado a",
        name: "repoweredTo",
        kind: inputTypes.select,
        size: 3,
        dropdownValues: [
          {
            value: 2018,
            label: 2018,
          },
          {
            value: 2020,
            label: 2020,
          },
        ],
      },
      {
        label: "Ejes",
        name: "axles",
        kind: inputTypes.select,
        size: 3,
        dropdownValues: [
          {
            value: 2018,
            label: 2018,
          },
          {
            value: 2020,
            label: 2020,
          },
        ],
      },
      {
        label: "Destinos",
        name: "destinationsId",
        kind: inputTypes.select,
        size: 3,
        dropdownValues: [
          {
            value: 1,
            label: "colombia",
          },
          {
            value: 1,
            label: "Mexico",
          },
        ],
      },
      {
        label: "No. Tarjeta de propiedad",
        name: "propertyCard",
        kind: inputTypes.input,
        size: 3,
      },
      {
        label: "Tipo de combustible",
        name: "fuelTypeId",
        kind: inputTypes.select,
        size: 3,
        dropdownValues: [
          {
            value: 1,
            label: "gasolina",
          },
          {
            value: 1,
            label: "diesel",
          },
        ],
      },
      {
        label: "Observaciones",
        name: "observations",
        kind: inputTypes.multiline,
        size: 12,
        rows: 8,
      },
    ],
  };
  return inputs;
};

// import { inputTypes } from "../types/Types";
// import { useSelector } from "react-redux";

// export const InputsControllers = () => {
//   const store = useSelector((state: any) => state);
//   console.log(store);

//   const inputs = {
//     createVehicles: {
//       placa: {
//         label: "Placa",
//         name: "carPlate",
//         kind: inputTypes.input,
//         size: 3,
//       },
//       marca: {
//         label: "Marca",
//         name: "brandId",
//         kind: inputTypes.select,
//         size: 3,
//         dropdownValues: [
//           {
//             value: 1,
//             label: "Mercedes",
//           },
//           {
//             value: 2,
//             label: "Volvo",
//           },
//         ],
//       },
//       vehicleTypeId: {
//         label: "Tipo de vehiculo",
//         name: "vehicleTypeId",
//         kind: inputTypes.select,
//         size: 3,
//         dropdownValues: [
//           {
//             value: 1,
//             label: "Pick Up",
//           },
//           {
//             value: 2,
//             label: "Camion",
//           },
//         ],
//       },
//       lineId: {
//         label: "Línea",
//         name: "lineId",
//         kind: inputTypes.input,
//         size: 3,
//       },
//       bodyWorkId: {
//         label: "Tipo de carroceria",
//         name: "bodyWorkId",
//         kind: inputTypes.select,
//         size: 3,
//         dropdownValues: [
//           {
//             value: 1,
//             label: "Mercedes",
//           },
//           {
//             value: 2,
//             label: "Volvo",
//           },
//         ],
//       },
//       color: {
//         label: "Color",
//         name: "color",
//         kind: inputTypes.select,
//         size: 3,
//         dropdownValues: [
//           {
//             value: 1,
//             label: "Mercedes",
//           },
//           {
//             value: 2,
//             label: "Volvo",
//           },
//         ],
//       },
//       modelYear: {
//         label: "Modelo (Año)",
//         name: "modelYear",
//         kind: inputTypes.select,
//         size: 3,
//         dropdownValues: [
//           {
//             value: 2010,
//             label: 2010,
//           },
//           {
//             value: 2020,
//             label: 2020,
//           },
//         ],
//       },
//       serialNumber: {
//         label: "Numero de serie",
//         name: "serialNumber",
//         kind: inputTypes.input,
//         size: 3,
//       },
//       netWeight: {
//         label: "Peso neto vehicular (kg)",
//         name: "netWeight",
//         kind: inputTypes.input,
//         size: 3,
//       },
//       emptyWeigth: {
//         label: "Peso vacio (kg)",
//         name: "emptyWeigth",
//         kind: inputTypes.input,
//         size: 3,
//       },
//       repoweredTo: {
//         label: "Repotenciado a",
//         name: "repoweredTo",
//         kind: inputTypes.select,
//         size: 3,
//         dropdownValues: [
//           {
//             value: 2018,
//             label: 2018,
//           },
//           {
//             value: 2020,
//             label: 2020,
//           },
//         ],
//       },
//       axles: {
//         label: "Ejes",
//         name: "axles",
//         kind: inputTypes.select,
//         size: 3,
//         dropdownValues: [
//           {
//             value: 2018,
//             label: 2018,
//           },
//           {
//             value: 2020,
//             label: 2020,
//           },
//         ],
//       },
//       destinationsId: {
//         label: "Destinos",
//         name: "destinationsId",
//         kind: inputTypes.select,
//         size: 3,
//         dropdownValues: [
//           {
//             value: 1,
//             label: "colombia",
//           },
//           {
//             value: 1,
//             label: "Mexico",
//           },
//         ],
//       },
//       propertyCard: {
//         label: "No. Tarjeta de propiedad",
//         name: "propertyCard",
//         kind: inputTypes.input,
//         size: 3,
//       },
//       fuelTypeId: {
//         label: "Tipo de combustible",
//         name: "fuelTypeId",
//         kind: inputTypes.select,
//         size: 3,
//         dropdownValues: [
//           {
//             value: 1,
//             label: "gasolina",
//           },
//           {
//             value: 1,
//             label: "diesel",
//           },
//         ],
//       },
//       observations: {
//         label: "Observaciones",
//         name: "observations",
//         kind: inputTypes.multiline,
//         size: 10,
//         rows: 5,
//       },
//     },
//   };
//   return inputs;
// };
