import { fileType, inputTypes } from "../types/Types";
import { useSelector } from "react-redux";
import { ParametersReducers } from "../reducers/parametersReducers";
import { useEffect } from "react";

export const InputControllerDrivers = () => {
  const store = useSelector((state: any) => state);

  const inputs = {
    createDrivers: [
      {
        label: "Nombres",
        name: "firstName",
        characterMinimun: 3,
        kind: inputTypes.input,
        size: 3,
      },
      {
        label: "Apellidos",
        name: "lastName",
        characterMinimun: 3,
        kind: inputTypes.input,
        size: 3,
      },
      {
        label: "Codigo de Conductor",
        name: "driverCodeId",
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
        label: "Años de Experiencia",
        name: "experienceYears",
        fileIs: fileType.number,
        kind: inputTypes.input,
        size: 3,
      },
      {
        label: "Tipo de Documento",
        name: "documentTypeId",
        kind: inputTypes.select,
        size: 3,
        dropdownValues: [
          {
            value: 1,
            label: "Cédula de ciudadania",
          },
          {
            value: 2,
            label: "Nit",
          },
        ],
      },
      {
        label: "Número de Documento",
        name: "documentNumber",
        verifyIfnotRepeated: true,
        fileIs: fileType.number,
        kind: inputTypes.input,
        size: 3,
      },
      {
        label: "Fecha De Nacimiento",
        name: "dueDate",
        kind: inputTypes.calendar,
        size: 3,
      },
      {
        label: "Celular",
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
        label: "Certificación Bancaria",
        name: "bankCertification",
        kind: inputTypes.select,
        size: 3,
        dropdownValues: [
          {
            value: true,
            label: "Si",
          },
          {
            value: false,
            label: "No",
          },
        ],
      },
      {
        label: "Banco",
        name: "bankId",
        kind: inputTypes.select,
        size: 3,
        dropdownValues: [
          {
            value: 1,
            label: "Bancolombia",
          },
          {
            value: 2,
            label: "Davivienda",
          },
        ],
      },
      {
        label: "Autorización de Saldos y Anticipos",
        name: "advancePayment",
        kind: inputTypes.select,
        size: 3,
        dropdownValues: [
          {
            value: true,
            label: "Si",
          },
          {
            value: false,
            label: "No",
          },
        ],
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
        label: "Categoría Licencia",
        name: "licenceCategoryId",
        kind: inputTypes.select,
        size: 3,
        dropdownValues: [
          {
            value: 1,
            label: "C4",
          },
          {
            value: 2,
            label: "C2",
          }
        ],
      },
      {
        label: "Fecha De Expiración Licencia",
        name: "dueDate",
        kind: inputTypes.calendar,
        size: 3,
      },
      {
        label: "Rut",
        name: "rut",
        kind: inputTypes.select,
        size: 3,
        dropdownValues: [
            {
              value: true,
              label: "Si",
            },
            {
              value: false,
              label: "No",
            },
            {
              value: false,
              label: "No Aplica",
            },
          ],
      },
      {
        label: "Rut con actividad",
        name: "hasActivityRut",
        kind: inputTypes.select,
        size: 3,
        dropdownValues: [
            {
              value: true,
              label: "Si",
            },
            {
              value: false,
              label: "No",
            },
            {
              value: false,
              label: "No Aplica",
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
        label: "Subir Foto del Conductor",
        name: "avatar",
        kind: inputTypes.uploadImage,
        size: 3,
        height: 150,
        fileIs: fileType.file,
        uploadBtn: "Cargar imagen",
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
