import React, { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import { DropdownField, CheckBoxField } from "../../../components/forms";
import { ParametersFormProps } from "./types";

export const ParametersForm = ({ formField }: ParametersFormProps) => {
  const { configTypeId, referenceCodeId, isActive } = formField;
  const [selectedType, setSelectedType] = useState(0);
  const [selectedReference, setSelectedReference] = useState<number | string>('');
  const { setFieldValue, initialValues } = useFormikContext<any>();

  const _handleReferenceCodeChange = (newValue: number) => {
    setSelectedReference(newValue || 0);
  };

  useEffect(() => {
    if (initialValues && initialValues[configTypeId.name]) {
      const intValue = parseInt(initialValues[configTypeId.name]);
      setSelectedType(intValue);
    }
    if (initialValues && initialValues[referenceCodeId.name]) {
      setSelectedReference(initialValues[referenceCodeId.name]);
    }

  }, [initialValues,  configTypeId.name, referenceCodeId.name])


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
          setFieldValue(configTypeId.name, newValue);
        }}
        value={selectedType}
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
      <CheckBoxField name={isActive.name} label={isActive.label}/>
    </React.Fragment>
  );
};

export default ParametersForm;
