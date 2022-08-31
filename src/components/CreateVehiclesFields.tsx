import { Grid } from "@mui/material";
import { inputTypes } from "../types/Types";
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
  form,
  image,
}: any) => {

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
              helperText={getError(input.name)}
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
              helperText={getError(input.name)}
            />
          );
        } else if (input.kind === inputTypes.uploadImage) {
          return (
            <ImageCard
              image={image}
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
