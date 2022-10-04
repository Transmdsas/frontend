import { InputType } from "zlib";
import { inputTypes } from "../types/Types";

export const Texts = {
  createVehicle: {
    pageTitle: "Información general del Vehículo",
    steps: [
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
    ],
    upload_button: "Cargar Archivo",
    default_image_title: "Fotos del vehículo",
  },
  createDriver: {
    pageTitle: "Información general del Conductor",
    steps: ["Información general del conductor", "Anexos del conductor"],
    inputs: [
      {
        label: "Nombres",
        name: "firstName",
        kind: inputTypes.input,
      },
    ],
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
},
  createParameter: {
    pageTitle: "Crear Nuevo Parametro",
  },
  Tecnomecanics: {
    pageTitle: "Tecnomecánica",
  },
  Insurers: {
    pageTitle: "Pólizas",
  },
}