import { fileType, inputTypes } from "../types/Types";
import { useSelector } from "react-redux";
import { ParametersReducers } from "../reducers/parametersReducers";
import { useEffect } from "react";

export const InputControllerVehicles = () => {
  const store = useSelector((state: any) => state);

  const inputs = {
    createVehicles: [
      {
        label: "Placa",
        name: "carPlate",
        verifyIfnotRepeated: true,
        characterMinimun: 6,
        characterMaximum: 6,
        kind: inputTypes.input,
        size: 3,
      },
      {
        label: "Codigo de Vehículo",
        name: "VehicleCodeId",
        kind: inputTypes.select,
        size: 3,
        dropdownValues: [
          {
            value: 1,
            label: "B1",
          },
          {
            value: 2,
            label: "B2",
          },
        ],
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
            value: "azul",
            label: "azul",
          },
          {
            value: "rojo",
            label: "rojo",
          },
          {
            value: "Amarillo",
            label: "Amarillo",
          },
          {
            value: "Verde",
            label: "Verde",
          },
          {
            value: "Naranja",
            label: "Naranja",
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
        fileIs: fileType.number,
        kind: inputTypes.input,
        size: 3,
      },
      {
        label: "Peso vacio (kg)",
        name: "emptyWeight",
        fileIs: fileType.number,
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
            value: 2018,
            label: 2020,
          },
        ],
      },
      {
        label: "Paises",
        name: "CountryId",
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
        label: "Destinos",
        name: "destinations",
        fileIs: fileType.array,
        kind: inputTypes.multipleSelections,
        enabledAfter: "CountryId",
        size: 6,
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
            value: 2,
            label: "diesel",
          },
        ],
      },
      {
        name: "divider1",
        kind: inputTypes.divider,
        size: 12,
        marginBottom: "10px",
        marginTop: "10px",
      },
      {
        label: "Subir Foto frontal",
        name: "frontPhoto",
        kind: inputTypes.uploadImage,
        size: 3,
        height: 250,
        fileIs: fileType.file,
        uploadBtn: "Cargar imagen",
      },
      {
        label: "Subir Foto trasera",
        name: "backPhoto",
        kind: inputTypes.uploadImage,
        size: 3,
        height: 250,
        fileIs: fileType.file,
        uploadBtn: "Cargar imagen",
      },
      {
        label: "Subir Foto lateral derecha",
        name: "rightPhoto",
        kind: inputTypes.uploadImage,
        size: 3,
        height: 250,
        fileIs: fileType.file,
        uploadBtn: "Cargar imagen",
      },
      {
        label: "Subir Foto lateral Izq",
        name: "leftPhoto",
        kind: inputTypes.uploadImage,
        size: 3,
        height: 250,
        fileIs: fileType.file,
        uploadBtn: "Cargar imagen",
      },
      {
        name: "divider2",
        kind: inputTypes.divider,
        size: 12,
        marginBottom: "10px",
        marginTop: "10px",
      },
      {
        label: "Observaciones",
        name: "observations",
        kind: inputTypes.multiline,
        size: 12,
        rows: 3,
      },
    ],
  };
  return inputs;
};
