import React from "react";
import { Grid } from "@mui/material";
import {
  DropdownField,
  InputField,
  CalendarField,
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
      carPlate,
      driver,
      chargeTime,
      entryDate,
      departureDate,
      sender,
      loadingPlace,
      address,
      recipients,
      downloadPlace,
      destinations,
  } = formField;
  
  return (
    <React.Fragment>
      <InputField label={carPlate.label} name={carPlate.name} type={"text"} />
      <DropdownField
        name={driver.name}
        label={driver.label}
        data={selectData}
      />
      <InputField label={chargeTime.label} name={chargeTime.name} type={"text"} />
      <CalendarField
        label={entryDate.label}
        name={entryDate.name}
        minDate={"1970-01-01"}
      />
       <CalendarField
        label={departureDate.label}
        name={departureDate.name}
        minDate={"1970-01-01"}
      />
        <DropdownField
        name={sender.name}
        label={sender.label}
        data={selectData}
      />
         <DropdownField
        name={loadingPlace.name}
        label={loadingPlace.label}
        data={selectData}
      />      
      <InputField label={address.label} name={address.name} type={"text"} />
      <DropdownField
        name={recipients.name}
        label={recipients.label}
        data={selectData}
      />
      <DropdownField
        name={downloadPlace.name}
        label={downloadPlace.label}
        data={selectData}
      />      
      <DropdownField
        name={destinations.name}
        label={destinations.label}
        data={selectData}
      />
      <Grid item />

    </React.Fragment>
  );
};
