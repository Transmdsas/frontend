import { Divider, Grid } from "@mui/material";
import React from "react";
import { CalendarField, DropdownField, InputField, MultilineField, UploadButton } from "./forms";
import { useValidations } from "../hooks/useValidations";
import { acceptedFileType } from "../types/Types";
import { Text } from "./Text";

const InsuranceKindValues = [
  { label: "insurance1", value: 1 },
  { label: "insurance2", value: 2 },
];

const InsuranceCompanyValues = [
  { label: "company1", value: 1 },
  { label: "company2", value: 2 },
];

const InitialForm = [
  {
    name: "insuranceTypeId",
    value: "",
    error: false,
    errorText: "",
  },
  {
    name: "insuranceNumber",
    value: "",
    error: false,
    errorText: "",
  },
  {
    name: "dueDate",
    value: "",
    error: false,
    errorText: "",
  },
  {
    name: "insuranceCompanyId",
    value: "",
    error: false,
    errorText: "",
  },
  {
    name: "insuredValue",
    value: "",
    error: false,
    errorText: "",
  },
  {
    name: "observations",
    value: "",
    error: false,
    errorText: "",
  },
  {
    name: "evidence",
    value: "",
    error: false,
    errorText: "",
  },
];

export const InsuranceNumber = () => {
  const [insuranceKind, setInsuranceKind] = React.useState("");
  const [insuranceCompany, setInsuranceCompany] = React.useState("");
  const [form, setForm] = React.useState(InitialForm);
  const [calendar, setCalendar] = React.useState(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
  const handleChangeCalendar = (e: any) => {
    setCalendar(e.$d);
    setForm((prev: any) =>
      prev.map((data: any) => {
        if (data.name === "dueDate") {
          return {
            ...data,
            value: e.$d,
            error: false,
          };
        } else {
          return data;
        }
      })
    );
  };

  const handleChange = (e: any) => {
    if (e.target.name === "insuranceTypeId") {
      setInsuranceKind(e.target.value);
    }
    if (e.target.name === "insuranceCompanyId") {
      setInsuranceCompany(e.target.value);
    }
    setForm((prev) =>
      prev.map((data: any) => {
        if (data.name === e.target.name) {
          return {
            ...data,
            value: e.target.value,
            error: false,
          };
        } else {
          return data;
        }
      })
    );
  };
  const handleUpload = (e: any) => {
    const preview = URL.createObjectURL(e.target.files[0]);
    console.log(preview);
    setForm((data: any) =>
      data.map((d: any) => {
        if (d.name === e.target.name) {
          return {
            ...d,
            value: e.target.files[0],
            imgName: e.target.files[0].name,
            preview: preview,
            error: false,
          };
        } else {
          return d;
        }
      })
    );
  };
  const { findError, findErrorMessage } = useValidations(form);

  const formObject = form
    .map((data) => {
      return {
        ...data,
        [data.name]: data.value,
      };
    })
    .reduce((a: any, b: any) => ({ ...a, ...b }));
  console.log("insideForm", formObject);

  return (
    <>
      <Divider
        variant="fullWidth"
        sx={{ marginBottom: "32px", marginTop: "42px" }}
      />
      <Text
        title="Otras Polizas"
        color="gray"
        fontSize={"15px"}
        weight={"200px"}
      />
      <Grid container spacing={3} flexWrap="wrap">
        <DropdownField
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          value={insuranceKind}
          label={"Tipo de  póliza"}
          name={"insuranceTypeId"}
          size={4}
          dropdownValues={InsuranceKindValues}
          error={findError("insuranceTypeId")}
          errorMessage={findErrorMessage("insuranceTypeId")}
        />
        <InputField
          size={4}
          label={"Numero de póliza"}
          name={"insuranceNumber"}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          error={findError("insuranceNumber")}
          errorMessage={findErrorMessage("insuranceNumber")}
        />
        <CalendarField
          handleChangeCalendar={handleChangeCalendar}
          label={"Fecha de vencimiento"}
          name="dueDate"
          size={4}
          value={calendar}
          error={findError("dueDate")}
          errorMessage={findErrorMessage("dueDate")}
        />
        <DropdownField
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          value={insuranceCompany}
          label={"Aseguradora"}
          name={"insuranceCompanyId"}
          size={4}
          dropdownValues={InsuranceCompanyValues}
          error={findError("insuranceCompanyId")}
          errorMessage={findErrorMessage("insuranceCompanyId")}
        />
        <InputField
          size={4}
          label={"Valor de póliza"}
          name={"insuredValue"}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          error={findError("insuredValue")}
          errorMessage={findErrorMessage("insuredValue")}
        />
        <MultilineField
          size={12}
          label={"Observaciones"}
          name={"observations"}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          rows={3}
          error={findError("observations")}
          errorMessage={findErrorMessage("observations")}
        />
        <UploadButton
          text={"Cargar poliza"}
          handleUpload={handleUpload}
          accepted={acceptedFileType.pdf}
          name="evidence"
          size={3}
          icon={"file_upload"}
          error={findError("evidence")}
          btnColor={"#4F6192"}
        />
      </Grid>
    </>
  );
};
