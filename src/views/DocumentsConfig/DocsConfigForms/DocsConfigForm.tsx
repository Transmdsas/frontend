import React, { useState } from "react";
import { DropdownField, CheckBoxField } from "../../../components/forms";
import { DocsConfigFormProps } from "./types";

export const DocsConfigForm = ({ formField }: DocsConfigFormProps) => {
  const { configTypeId, referenceCodeId, isActive } = formField;
  const [selectedType, setSelectedType] = useState(0);
  const [selectedReference, setSelectedReference] = useState<number | string>('');

  const _handleReferenceCodeChange = (newValue: number) => {
    setSelectedReference(newValue || 0);
  };

  return (
    <React.Fragment>
      <DropdownField
        name={configTypeId.name}
        label={configTypeId.label}
        parameterid={15}
        onchange={(newValue: string) => {
          const intValue = parseInt(newValue);
          setSelectedReference('');
          setSelectedType(intValue);
          console.log(selectedReference);
        }}
      />
      {(() => {
        const parameterid = selectedType === 352 ? 3 : selectedType === 349 ? 7 : 0;
        return parameterid !== 0 ? (
          <DropdownField
            name={referenceCodeId.name}
            label={referenceCodeId.label}
            parameterid={parameterid}
            onchange={_handleReferenceCodeChange}
            value={selectedReference}
          />
        ) : null;
      })()}
      <CheckBoxField name={isActive.name} label={isActive.label} />
    </React.Fragment>
  );
};

export default DocsConfigForm;
