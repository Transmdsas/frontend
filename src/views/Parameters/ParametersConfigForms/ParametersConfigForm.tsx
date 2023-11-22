import React, { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import { DropdownField, CheckBoxField } from "../../../components/forms";
import { ParametersConfigFormProps } from "./types";

export const ParametersConfigForm = ({ formField }: ParametersConfigFormProps) => {
  const { id, referenceCodeId, isActive } = formField;
  const [selectedType, setSelectedType] = useState(0);
  const [selectedReference, setSelectedReference] = useState<number | string>('');
  const { setFieldValue, initialValues } = useFormikContext<any>();

  const _handleReferenceCodeChange = (newValue: number) => {
    setSelectedReference(newValue || 0);
  };

  useEffect(() => {
    if (initialValues && initialValues[id.name]) {
      const intValue = parseInt(initialValues[id.name]);
      setSelectedType(intValue);
    }
    if (initialValues && initialValues[referenceCodeId.name]) {
      setSelectedReference(initialValues[referenceCodeId.name]);
    }

  }, [initialValues,  id.name, referenceCodeId.name])


  return (
    <React.Fragment>
      <DropdownField
        name={id.name}
        label={id.label}
        parameterid={15}
        onchange={(newValue: string) => {
          const intValue = parseInt(newValue);
          setSelectedReference('');
          setSelectedType(intValue);
          setFieldValue(id.name, newValue);
        }}
        value={selectedType}
      />
      {(() => {
        const parameterid = selectedType === 352 ? 3 : selectedType === 349 ? 7 : 0;
        return parameterid !== 0 ? (
          <DropdownField
            name={id.name}
            label={id.label}
            parameterid={parameterid}
            onchange={_handleReferenceCodeChange}
            value={selectedReference}
          />
        ) : null;
      })()}
      <CheckBoxField name={isActive.name} label={isActive.label}/>
    </React.Fragment>
  );
};

export default ParametersConfigForm;
