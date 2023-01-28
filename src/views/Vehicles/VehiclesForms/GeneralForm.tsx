import { Grid } from "@mui/material";
import React from "react";
import {
  DropdownField,
  InputField,
  CalendarField,
} from "../../../components/forms";
import ImageCard from "../../../components/ImageCard";

const selectData = [
  { description: "Si", id: "1" },
  { description: "No", id: "2" },
  { description: "No aplica", id: "3" },
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
        // data={selectData}
        parameterid={3}
      />
      <DropdownField
        name={vehicleCodeId.name}
        label={vehicleCodeId.label}
        data={selectData}
        
      />
      <DropdownField
        name={lineId.name}
        label={lineId.label}
        //data={selectData}
        parameterid={1}
      />
      <DropdownField
        name={bodyWorkId.name}
        label={bodyWorkId.label}
        //data={selectData}
        parameterid={2}
      />
      <InputField label={color.label} name={color.name} type={"text"} />      

      <CalendarField
        label={modelYear.label}
        name={modelYear.name}
        minDate={"1970-01-01"}
      />
      <InputField label={serialNumber.label} name={serialNumber.name} type={"text"} />
      <InputField label={netWeight.label} name={netWeight.name} type={"text"} />
      <InputField label={emptyWeight.label} name={emptyWeight.name} type={"text"} />

      <CalendarField
        label={repoweredTo.label}
        name={repoweredTo.name}
        minDate={"1970-01-01"}
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
        //data={selectData}
        parameterid={10}
      />
      <Grid item />
    </React.Fragment>
  );
};
