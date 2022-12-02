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
        businessName,
        documentTypeId,
        documentNumber,
        cellphone,
        email,
        birthDate,
        address,
        countryId,

    },
  } = props;

  return (
    <React.Fragment>
      <InputField label={businessName.label} name={businessName.name} type={"text"} />
        <DropdownField
        name={documentTypeId.name}
        label={documentTypeId.label}
        //data={selectData}
        parameterid={9}
      />
      <InputField label={documentNumber.label} name={documentNumber.name} type={"text"} />
      <InputField label={cellphone.label} name={cellphone.name} type={"text"} />
      <InputField label={email.label} name={email.name} type={"text"} />

       <CalendarField
        label={birthDate.label}
        name={birthDate.name}
        minDate={"1970-01-01"}
      />
      <InputField label={address.label} name={address.name} type={"text"} />
        <DropdownField
        name={countryId.name}
        label={countryId.label}
        //data={selectData}
        parameterid={70}
      />
         
      <Grid item />

    </React.Fragment>
  );
};
