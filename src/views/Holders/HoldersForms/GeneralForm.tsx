import React from "react";
import { Grid } from "@mui/material";
import {
  DropdownField,
  InputField,
  CalendarField,
  CheckBoxField,
} from "../../../components/forms";
import { useSelector } from "react-redux";
import { RootState } from "./../../../store";
import { City } from "../../../store/cities/types";
import { GeneralFormProps } from "./types";
import CountrySelector from "../../../components/forms/Dropdown/CountrySelector";
import DepartmentSelector from "../../../components/forms/Dropdown/DepartmentSelector";

const selectData = [
  { description: "Si", id: "1" },
  { description: "No", id: "2" },
  { description: "No aplica", id: "3" },
];

export const GeneralForm = ({ formField }: GeneralFormProps) => {
  const {
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
  } = formField;

  const selectedCountry = useSelector(
    (state: RootState) => state.countries.selectedCountry
  );

  const selectedDepartment = useSelector(
    (state: RootState) => state.departments.selectedDepartment
  );
  const cities: City[] = useSelector(
    (state: RootState) => state.departments.cities
  );

  return (
    <React.Fragment>
      <InputField label={firstName.label} name={firstName.name} type={"text"} />
      <InputField label={lastName.label} name={lastName.name} type={"text"} />
      <DropdownField
        name={documentTypeId.name}
        label={documentTypeId.label}
        parameterid={8}
      />
      <InputField
        label={documentNumber.label}
        name={documentNumber.name}
        type={"text"}
      />
      <InputField label={cellphone.label} name={cellphone.name} type={"tel"} />
      <InputField label={email.label} name={email.name} type={"email"} />
      <CalendarField
        label={birthDate.label}
        name={birthDate.name}
        minDate={"1970-01-01"}
      />
      <InputField label={address.label} name={address.name} type={"text"} />

      <CountrySelector
        name={countryId.name}
        label={countryId.label}
        value={selectedCountry || null}
      />
      <DepartmentSelector
        name={departmentId.name}
        label={departmentId.label}
        value={selectedDepartment || null}
      />

      <DropdownField
        name={cityId.name}
        label={cityId.label}
        data={cities}
        disabled={selectedDepartment === null && cities.length === 0}
      />
      <Grid item />
      <DropdownField
        name={bankCertification.name}
        label={bankCertification.label}
        data={selectData}
      />
      <DropdownField name={bankId.name} label={bankId.label} parameterid={13} />
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
