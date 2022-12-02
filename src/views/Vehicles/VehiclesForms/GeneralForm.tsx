import { Grid } from "@mui/material";
import React from "react";
import {
  DropdownField,
  InputField,
  CalendarField,
} from "../../../components/forms";
import ImageCard from "../../../components/ImageCard";

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
      brandId,
      vehicleTypeId,
      vehicleCodeId,
      lineId,
      bodyWorkId,
      color,
      modelYear,
      serialNumber,
      netWeight,
      emptyWeight,
      repoweredTo,
      axles,
      destinations,
      fuelType 
    },
  } = props;

  return (
    <React.Fragment>
      <InputField label={carPlate.label} name={carPlate.name} type={"text"} />
      <DropdownField
        name={brandId.name}
        label={brandId.label}
        //data={selectData}
        parameterid={2}
      />
      <DropdownField
        name={vehicleTypeId.name}
        label={vehicleTypeId.label}
        data={selectData}
      />
      <DropdownField
        name={vehicleCodeId.name}
        label={vehicleCodeId.label}
        data={selectData}
      />
      <DropdownField
        name={lineId.name}
        label={lineId.label}
        data={selectData}
      />
      <DropdownField
        name={bodyWorkId.name}
        label={bodyWorkId.label}
        data={selectData}
      />
      <DropdownField
        name={color.name}
        label={color.label}
        data={selectData}
      />
      <CalendarField
        label={modelYear.label}
        name={modelYear.name}
        minDate={"1970-01-01"}
      />
      <InputField label={serialNumber.label} name={serialNumber.name} type={"text"} />
      <InputField label={netWeight.label} name={netWeight.name} type={"text"} />
      <InputField label={emptyWeight.label} name={emptyWeight.name} type={"text"} />

      <DropdownField
        name={repoweredTo.name}
        label={repoweredTo.label}
        data={selectData}
      />
      <DropdownField
        name={axles.name}
        label={axles.label}
        data={selectData}
      />
      <DropdownField
        name={destinations.name}
        label={destinations.label}
        data={selectData}
      />

      <DropdownField
        name={fuelType.name}
        label={fuelType.label}
        data={selectData}
      />
      <Grid item />
    </React.Fragment>
  );
};
