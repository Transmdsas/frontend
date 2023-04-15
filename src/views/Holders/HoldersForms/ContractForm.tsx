import React from "react";
import {
  DropdownField,
  CalendarField,
  UploadButton,
} from "../../../components/forms";

export const ContractForm = (props: any) => {
  const {
    formField: { contractTypeId, contractDueDate, contractFile },
  } = props;

  return (
    <React.Fragment>
      <DropdownField
        name={contractTypeId.name}
        label={contractTypeId.label}
        parameterid={14}
      />
      <CalendarField
        label={contractDueDate.label}
        name={contractDueDate.name}
        minDate={new Date()}
      />
      <UploadButton  name={contractFile.name}/>
    </React.Fragment>
  );
};
