import { acceptedFileType, fileType, inputTypes } from "../types/Types";
import { useSelector } from "react-redux";

export const InputControllerVehicles = () => {
  const store = useSelector((state: any) => state);
  const yearsArray = new Array(new Date().getFullYear() - 1970 + 2)
    .fill(1970)
    .map((data: any, i: number) => ({
      label: data + i,
      value: data + i,
    }))
    .sort((a, b) => b.value - a.value);

  const axesArray = new Array(10 - 2 + 1).fill(2).map((data: any, i: any) => ({
    value: data + i,
    label: data + i,
  }));

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
        name: "vehicleCodeId",
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
        dropdownValues:
          store.ParametersReducers.parameters.parametersResponseBrandId?.values.map(
            (data: any) => ({
              value: data.id,
              label: data.description,
            })
          ) || [
            { value: 1, label: "Brand1" },
            { value: 2, label: "Brand2" },
          ],
      },
      {
        label: "Tipo de vehiculo",
        name: "vehicleTypeId",
        kind: inputTypes.select,
        size: 3,
        dropdownValues:
          store.ParametersReducers.parameters.parametersResponseVehicleTypeId?.values.map(
            (data: any) => ({
              value: data.id,
              label: data.description,
            })
          ) || [
            { value: 1, label: "vehicle1" },
            { value: 2, label: "vehicle2" },
          ],
      },
      {
        label: "Línea",
        name: "lineId",
        kind: inputTypes.select,
        size: 3,
        dropdownValues:
          store.ParametersReducers.parameters.parametersResponseLineId?.values.map(
            (data: any) => ({
              value: data.id,
              label: data.description,
            })
          ) || [
            { value: 1, label: "line1" },
            { value: 2, label: "line2" },
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
        kind: inputTypes.input,
        size: 3,

      },
      {
        label: "Modelo (Año)",
        name: "modelYear",
        kind: inputTypes.select,
        size: 3,
        dropdownValues: yearsArray,
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
        dropdownValues: yearsArray,
      },
      {
        label: "Ejes",
        name: "axles",
        kind: inputTypes.select,
        size: 3,
        dropdownValues: axesArray,
      },
      {
        label: "Paises",
        name: "countryId",
        kind: inputTypes.select,
        activate: "destinations",
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
        characterMinimun: 3,
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
            label: "Gasolina",
          },
          {
            value: 2,
            label: "Diesel",
          },
          {
            value: 3,
            label: "Hibrido",
          },
          {
            value: 4,
            label: "Electrico",
          },
        ],
      },
      {
        label: "Largo (mts)",
        name: "vehicleLength",
        fileIs: fileType.number,
        kind: inputTypes.input,
        size: 3,
      },
      {
        label: "Ancho (mts)",
        name: "vehicleWidth",
        fileIs: fileType.number,
        kind: inputTypes.input,
        size: 3,
      },
      {
        label: "Alto (mts)",
        name: "vehicleHeight",
        fileIs: fileType.number,
        kind: inputTypes.input,
        size: 3,
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
        acceptedFile: acceptedFileType.image,
        size: 3,
        height: 250,
        fileIs: fileType.file,
        uploadBtn: "Cargar imagen",
      },
      {
        label: "Subir Foto trasera",
        name: "backPhoto",
        kind: inputTypes.uploadImage,
        acceptedFile: acceptedFileType.image,
        size: 3,
        height: 250,
        fileIs: fileType.file,
        uploadBtn: "Cargar imagen",
      },
      {
        label: "Subir Foto lateral derecha",
        name: "rightPhoto",
        kind: inputTypes.uploadImage,
        acceptedFile: acceptedFileType.image,
        size: 3,
        height: 250,
        fileIs: fileType.file,
        uploadBtn: "Cargar imagen",
      },
      {
        label: "Subir Foto lateral Izq",
        name: "leftPhoto",
        kind: inputTypes.uploadImage,
        acceptedFile: acceptedFileType.image,
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
