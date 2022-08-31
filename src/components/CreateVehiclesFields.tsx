import React from "react";
import { Grid } from "@mui/material";
import { inputTypes } from "../types/Types";
import { InputControllerVehicles } from "../utils/InputControllerVehicles";
import { DropdownField } from "./DropdownField";
import ImageCard from "./ImageCard";
import { InputField } from "./InputField";
import { InputsDivider } from "./InputsDivider";
import { MultilineField } from "./MultilineField";

export const CreateVehiclesFields = ({
  inputs,
  handleSubmit,
  handleChange,
  handleUpload,
}: any) => {
  //call the inputs controllers object

  console.log(inputs);

  //create am object based in the InputControllers
  const object = inputs
    .map((data: any) => {
      if (data.kind !== inputTypes.divider) {
        return { name: data.name, value: "", error: false };
      } else {
        return;
      }
    })
    .filter((data: any) => data !== undefined);

  console.log({ object });

  const [form, setForm] = React.useState(object);
  // const [apiData, setApiData] = React.useState({});
  // const [filled, setFilled] = React.useState(false);

  // const handleSubmit = (e: any): void => {
  //   e.preventDefault();
  //   const error = form.map((data) => {
  //     if (data?.value.length === 0) {
  //       return { ...data, error: true };
  //     } else {
  //       return data;
  //     }
  //   });
  // };

  // const handleChange = (e: any): void => {
  //   setApiData((data) => ({
  //     ...data,
  //     [e.target.name]: e.target.value,
  //   }));

  //   /*
  //    * find the 'name' inside the Object in the array
  //    * then change its value from "" to the selected or whateveris in the input
  //    */
  //   setForm((data: any) =>
  //     data.map((d: any) => {
  //       if (d.name === e.target.name) {
  //         return {
  //           ...d,
  //           value: e.target.value,
  //           error: false,
  //         };
  //       } else {
  //         return d;
  //       }
  //     })
  //   );
  // };
  const getValue = (name: string) => {
    const value = form.find((data: any) => data.name === name)?.value;
    return value;
  };

  const getError = (name: string) => {
    const error = form.find((data: any) => data.name === name)?.error;
    return error;
  };

  console.log({ form });
  // console.log({ apiData });
  return (
    <Grid container spacing={3}>
      {/* create dynamically inputs based in the inputsControllers object */}
      {inputs.map((input: any) => {
        if (input.kind === inputTypes.select) {
          return (
            <DropdownField
              {...input}
              handleSubmit={(e: any) => handleSubmit(e)}
              handleChange={(e: any) => handleChange(e)}
              value={getValue(input.name)}
              size={input.size}
              key={input.name}
              error={getError(input.name)}
            />
          );
        } else if (input.kind === inputTypes.input) {
          return (
            <InputField
              {...input}
              handleSubmit={(e: any) => handleSubmit(e)}
              handleChange={(e: any) => handleChange(e)}
              size={input.size}
              key={input.name}
              error={getError(input.name)}
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
              handleUpload={(e: any) => handleUpload(e)}
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
              handleChange={(e: any) => handleChange(e)}
              handleSubmit={(e: any) => handleSubmit(e)}
              key={input.name}
            />
          );
        }
      })}
    </Grid>
  );
};
