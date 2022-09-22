import React from "react";

export const useValidations = (form: any) => {
  const findError = (name: any) => {
    return form.find((data: any) => data.name === name)?.error;
  };
  const findErrorMessage = (name: any) => {
    return form.find((data: any) => data.name === name)?.errorText;
  };
  return { findError, findErrorMessage };
};
