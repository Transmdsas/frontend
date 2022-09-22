import { inputTypes } from "../types/Types";
import { Tecnomecanics } from "../containers/Tecnomecanics";
import { Insurers } from "../containers/Insurers";

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
  Tecnomecanics: {
    pageTitle: "Tecnomecánica",
  },
  Insurers: {
    pageTitle: "Pólizas",
  },
};
