import { Grid } from "@mui/material";
import React from "react";
import {
  DropdownField,
  InputField,
  CalendarField,
  CheckBoxField,
} from "../../../components/forms";

const selectData = [
  { label: "Bogotá", value: "10" },
  { label: "Chia", value: "20" },
  { label: "Mosquera", value: "30" },
  { label: "Cajica", value: "40" },
];

export const GeneralForm = (props: any) => {
  const {
    formField: {
      firstName,
      lastName,
      documentTypeId,
      documentNumber,
      cellphone,
      email,
      birthDate,
      address,
      countryId,
      departmentId,
      cityId,
      bankCertification,
      bankId,
      rut,
      hasActivityRut,
      balances,
      advances,
    },
  } = props;

  return (
    <React.Fragment>
      <InputField label={firstName.label} name={firstName.name} type={"text"} />
      <InputField label={lastName.label} name={lastName.name} type={"text"} />
      <DropdownField
        name={documentTypeId.name}
        label={documentTypeId.label}
        data={selectData}
      />
      <InputField
        label={documentNumber.label}
        name={documentNumber.name}
        type={"number"}
      />
      <InputField label={cellphone.label} name={cellphone.name} type={"tel"} />
      <InputField label={email.label} name={email.name} type={"email"} />
      <CalendarField
        label={birthDate.label}
        name={birthDate.name}
        minDate={"1970-01-01"}
      />
      <InputField label={address.label} name={address.name} type={"text"} />
      <DropdownField
        name={countryId.name}
        label={countryId.label}
        data={selectData}
      />
      <DropdownField
        name={departmentId.name}
        label={departmentId.label}
        data={selectData}
      />
      <DropdownField
        name={cityId.name}
        label={cityId.label}
        data={selectData}
      />
      <Grid item />
      <DropdownField
        name={bankCertification.name}
        label={bankCertification.label}
        data={selectData}
      />
      <DropdownField
        name={bankId.name}
        label={bankId.label}
        data={selectData}
      />
      <DropdownField name={rut.name} label={rut.label} data={selectData} />
      <DropdownField
        name={hasActivityRut.name}
        label={hasActivityRut.label}
        data={selectData}
      />
      <CheckBoxField name={balances.name} label={balances.label} />
      <CheckBoxField name={advances.name} label={advances.label} />
    </React.Fragment>
  );
};
