import { Grid } from "@mui/material";
import React from "react";
import {
  DropdownField,
  InputField,
  CalendarField,
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
    },
  } = props;

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
