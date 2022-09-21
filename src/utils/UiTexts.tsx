import { InputType } from "zlib";
import { inputTypes } from "../types/Types";

export const Texts = {
  createVehicle: {
    pageTitle: "Información general del Vehículo",
    steps: [
      "Informaciòn general del vehìculo",
      "Tecnomecánica",
      "pólizas",
      "equipo de comunicaciones",
      "anexos del vehículo",
    ],
    inputs: [
      {
        label: "Placa",
        name: "carPlate",
        kind: inputTypes.input,
      },
      {
        label: "Marca",
        name: "marca",
        kind: inputTypes.select,
        hasDropdownValues: [
          "123456901011",
          "123456901011",
          "123456901011",
          "123456901011",
          "123456901011",
          "123456901011",
        ],
      },
      {
        label: "Tipo de vehiculo",
        name: "tipo_de_vehiculo",
        kind: inputTypes.select,
        hasDropdownValues: [
          "value 1",
          "value 2",
          "value 3",
          "value 4",
          "value 5",
          "value 6",
        ],
      },
      {
        label: "Línea",
        name: "linea",
        kind: inputTypes.input,
      },
      {
        label: "Tipo de carroceria",
        name: "tipo_de_carroceria",
        kind: inputTypes.select,
        hasDropdownValues: [
          "value 1",
          "value 2",
          "value 3",
          "value 4",
          "value 5",
          "value 6",
        ],
      },
      {
        label: "Color",
        kind: inputTypes.select,
        hasDropdownValues: [
          "value 1",
          "value 2",
          "value 3",
          "value 4",
          "value 5",
          "value 6",
        ],
      },
      {
        fieldName: "Modelo (Año)",
        kind: inputTypes.select,
        hasDropdownValues: [
          "value 1",
          "value 2",
          "value 3",
          "value 4",
          "value 5",
          "value 6",
        ],
      },
      {
        fieldName: "Modelo (Año)",
        kind: inputTypes.input,
      },
      // "placa",
      // "Marca",
      // "Tipo de vehiculo",
      // "Línea",
      // "Tipo de carroceria",
      // "Color",
      // "Modelo (Año)",
      // "Numero de serie",
      // "Peso neto vehicular (kg)",
      // "Peso vacio (kg)",
      // "Repotenciado a",
      // "Ejes",
      // "Destinos",
      // "N° Tarjeta de propiedad",
      // "Tipo de combustible",
    ],
    upload_button: "Cargar Archivo",
    default_image_title: "Fotos del vehículo",
  },
  createDriver: {
    pageTitle: "Información general del Conductor",
    steps: [
      "Información general del conductor",
      "Anexos del conductor"
    ],
    inputs: [
      {
        label: "Nombres",
        name: "firstName",
        kind: inputTypes.input,
      },
    ]
  },
    createOwners: {
      pageTitle: "Información general del Propietarios",
      steps: [
        "Información general del propietario",
        "Anexos"
      ],
      inputs: [
    {
      label: "Nombres",
      name: "firstName",
      kind: inputTypes.input,
      },
    ]
  },
  createHolders: {
    pageTitle: "Información General Del Tenedor",
    steps: [
      "Información General Del Tenedor",
      "Contrato Tenedor",
      "Anexos"
    ],
    inputs: [
  {
    label: "Nombres",
    name: "firstName",
    kind: inputTypes.input,
    },
  ]
},
  createOrders: {
  pageTitle: "Creación De Ordenes De Cargue",
  steps: [
    "Creación De Ordenes De Cargue",
    "Contrato Tenedor",
    "Anexos"
  ],
  inputs: [
{
  label: "Nombres",
  name: "firstName",
  kind: inputTypes.input,
  },
]
}
}
