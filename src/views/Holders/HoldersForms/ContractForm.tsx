import React, { useState } from "react";
import {
  DropdownField,
  CalendarField,
  UploadButton,
} from "../../../components/forms";

const selectData = [
  { label: "Bogotá", value: "10" },
  { label: "Chia", value: "20" },
  { label: "Mosquera", value: "30" },
  { label: "Cajica", value: "40" },
];

export const ContractForm = (props: any) => {
  const {
    formField: { contractTypeId, contractDueDate, contractFile },
  } = props;

  return (
    <React.Fragment>
      <DropdownField
        name={contractTypeId.name}
        label={contractTypeId.label}
        data={selectData}
      />
      <CalendarField
        label={contractDueDate.label}
        name={contractDueDate.name}
        minDate={new Date()}
      />
      <UploadButton  label={contractFile.label} name={contractFile.name}/>
    </React.Fragment>
  );
};
