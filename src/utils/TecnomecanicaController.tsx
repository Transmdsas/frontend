import { acceptedFileType, fileType, inputTypes } from "../types/Types";
import { useSelector } from "react-redux";

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
        size: 3,
      },
      {
        name: "evidence",
        kind: inputTypes.uploadButton,
        acceptedFile: acceptedFileType.pdf,
        size: 3,
        fileIs: fileType.file,
        uploadBtn: "Cargar documento",
        icon: "file_upload",
      },
      {
        label: "Fecha de vencimiento",
        name: "dueDate",
        kind: inputTypes.calendar,
        size: 6,
      },
      {
        label: "Centro de diagnóstico Automotriz",
        name: "diagnosticCenterId",
        kind: inputTypes.select,
        fileIs: fileType.date,
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
