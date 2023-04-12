import React from "react";
import { Grid } from "@mui/material";
import {
  DropdownField,
  InputField,
} from "../../../components/forms";
import { useSelector } from "react-redux";
import { RootState } from "./../../../store";
import { City } from "../../../store/cities/types";
import { GeneralFormProps } from "./types";
import CountrySelector from "../../../components/forms/Dropdown/CountrySelector";
import DepartmentSelector from "../../../components/forms/Dropdown/DepartmentSelector";



export const GeneralForm = ({ formField }: GeneralFormProps) => {
  const {
      customerName,
      documentNumber,
      documentTypeId,
      cellphone,
      email,
      address,
      countryId,
      departmentId,
      cityId
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
      <InputField 
      label={customerName.label} 
      name={customerName.name} 
      type={"text"} 
      />
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
      <InputField label={cellphone.label} name={cellphone.name} type={"text"} />
      <InputField label={email.label} name={email.name} type={"text"} />
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
    </React.Fragment>
  );
};
