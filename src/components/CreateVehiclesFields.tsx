import { Grid } from "@mui/material";
import { inputTypes } from "../types/Types";
import { DropdownField } from "./DropdownField";
import ImageCard from "./ImageCard";
import { InputField } from "./InputField";
import { InputsDivider } from "./InputsDivider";
import { MultilineField } from "./MultilineField";
import MultipleSelectionsInputs from "./MultipleSelectionsInputs";
import { useEffect } from "react";

export const CreateVehiclesFields = ({
  inputs,
  handleSubmit,
  handleChange,
  handleUpload,
  handleMultipleOptions,
  form,
}: any) => {
  useEffect(() => {
    const input = document.querySelectorAll(".MuiInputBase-root");
    Object.values(input).map((dat: any) =>
      dat.setAttribute("style", "border-radius: 15px")
    );
  }, []);

  const getValue = (name: string) => {
    const value = form.find((data: any) => data.name === name)?.value;
    return value;
  };

  const getError = (name: string) => {
    const error = form.find((data: any) => data.name === name)?.error;
    return error;
  };

  const getImage = (name: any) => {
    const image = form.find((data: any) => data.name === name)?.preview;
    return image;
  };

  const getErrorMessage = (name: any) => {
    const errorMessage = form.find(
      (data: any) => data.name === name
    )?.errorText;
    return errorMessage;
  };

  // console.log({ form });
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
              errorMessage={getErrorMessage(input.name)}
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
              errorMessage={getErrorMessage(input.name)}
              //type={input.fileIs || 'text'}
            />
          );
        } else if (input.kind === inputTypes.uploadImage) {
          return (
            <ImageCard
              image={getImage(input.name)}
              imageTitle={input.label}
              buttonTexts={input.uploadBtn}
              height={input.height}
              size={input.size}
              key={input.name}
              handleUpload={(e: any) => handleUpload(e)}
              name={input.name}
              error={getError(input.name)}
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
              error={getError(input.name)}
              errorMessage={getErrorMessage(input.name)}
            />
          );
        } else if (input.kind === inputTypes.multipleSelections) {
          return (
            <MultipleSelectionsInputs
              {...input}
              handleChange={(e: any) => handleChange(e)}
              handleSubmit={(e: any) => handleSubmit(e)}
              handleMultipleOptions={(value: any, name: any) =>
                handleMultipleOptions(value, name)
              }
              error={getError(input.name)}
              errorMessage={getErrorMessage(input.name)}
              key={input.name}
              size={input.size}
            />
          );
        }
      })}
    </Grid>
  );
};
