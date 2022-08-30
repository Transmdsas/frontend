import { Divider, Grid } from "@mui/material";
import React from "react";
import { inputTypes } from "../types/Types";
import { InputControllerVehicles } from "../utils/InputControllerVehicles";
import { DropdownField } from "./DropdownField";
import ImageCard from "./ImageCard";
import { InputField } from "./InputField";
import { InputsDivider } from "./InputsDivider";
import { MultilineField } from "./MultilineField";

export const CreateVehiclesFields = () => {
  //call the inputs controllers object
  const inputs = InputControllerVehicles().createVehicles;
  console.log(inputs);

  //create am object based in the InputControllers
  const object = inputs
    .map((data) => {
      if (data.kind !== inputTypes.divider) {
        return { name: data.name, value: "" };
      } else {
        return;
      }
    })
    .filter((data) => data !== undefined);

  const [form, setForm] = React.useState(object);
  const [apiData, setApiData] = React.useState({});

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    console.log(e.target.name);
    validateFields();
  };
  const handleChange = (e: any): void => {
    setApiData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));

    /*
     * find the 'name' inside the Object in the array
     * then change its value from "" to the selected or whateveris in the input
     */
    setForm((data: any) =>
      data.map((d: any) => {
        if (d.name === e.target.name) {
          return {
            ...d,
            value: e.target.value,
          };
        } else {
          return d;
        }
      })
    );
  };
  const getValue = (name: string) => {
    const value = form.find((data: any) => data.name === name)?.value;
    return value;
  };

  const validateFields = () => {
    const validation = form.filter((data: any) => data.value.length === 0);
    if (validation.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  console.log({ form });
  console.log({ apiData });
  return (
    <Grid container spacing={3}>
      {/* create dynamically inputs based in the inputsControllers object */}
      {inputs.map((input) => {
        if (input.kind === inputTypes.select) {
          return (
            <DropdownField
              {...input}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              value={getValue(input.name)}
              size={input.size}
              key={input.name}
            />
          );
        } else if (input.kind === inputTypes.input) {
          return (
            <InputField
              {...input}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              size={input.size}
              key={input.name}
            />
          );
        } else if (input.kind === inputTypes.uploadImage) {
          return (
            <ImageCard
              image={""}
              imageTitle={input.label}
              buttonTexts={input.uploadBtn}
              height={input.height}
              size={input.size}
              key={input.name}
            />
          );
        } else if (input.kind === inputTypes.divider) {
          return (
            <InputsDivider
              size={input.size}
              marginBottom={input.marginBottom}
              marginTop={input.marginTop}
              key={input.name}
            />
          );
        } else if (input.kind === inputTypes.multiline) {
          return (
            <MultilineField
              {...input}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              key={input.name}
            />
          );
        }
      })}
    </Grid>
  );
};
