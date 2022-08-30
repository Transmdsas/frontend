import { inputTypes } from "../types/Types";
import { useSelector } from "react-redux";

export const InputControllerVehicles = () => {
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
            value: 2123674,
            label: "Mercedes",
          },
          {
            value: 126902,
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
            value: 12944533,
            label: "Pick Up",
          },
          {
            value: 12555689,
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
            value: 22887654,
            label: "Mercedes",
          },
          {
            value: 88900023,
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
            value: 12458790,
            label: "Mercedes",
          },
          {
            value: 12908655,
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
            value: 201889900,
            label: 2018,
          },
          {
            value: 20289008,
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
            value: 201845677,
            label: 2018,
          },
          {
            value: 2020000,
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
            value: 1235688,
            label: "colombia",
          },
          {
            value: 1789456,
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
            value: 1234566,
            label: "gasolina",
          },
          {
            value: 9997865,
            label: "diesel",
          },
        ],
      },
      {
        name: "divider1",
        kind: inputTypes.divider,
        size: 12,
        marginBottom: "32px",
        marginTop: "32px",
      },
      {
        label: "Subir Foto frontal",
        name: "frontPhoto",
        kind: inputTypes.uploadImage,
        size: 3,
        height: 250,
        uploadBtn: "Cargar imagen",
      },
      {
        label: "Subir Foto trasera",
        name: "backPhoto",
        kind: inputTypes.uploadImage,
        size: 3,
        height: 250,
        uploadBtn: "Cargar imagen",
      },
      {
        label: "Subir Foto lateral derecha",
        name: "rightPhoto",
        kind: inputTypes.uploadImage,
        size: 3,
        height: 250,
        uploadBtn: "Cargar imagen",
      },
      {
        label: "Subir Foto lateral Izq",
        name: "leftPhoto",
        kind: inputTypes.uploadImage,
        size: 3,
        height: 250,
        uploadBtn: "Cargar imagen",
      },
      {
        name: "divider2",
        kind: inputTypes.divider,
        size: 12,
        marginBottom: "32px",
        marginTop: "32px",
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
