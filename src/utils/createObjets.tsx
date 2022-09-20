import { inputTypes } from "../types/Types";

export const createObjets = (inputs: any) => {
  const initialForm = inputs
    .map((data: any) => {
      if (
        data.kind !== inputTypes.divider &&
        data.kind !== inputTypes.multipleSelections &&
        !data.characterMaximum &&
        !data.characterMinimun &&
        !data.verifyIfnotRepeated
      ) {
        return {
          name: data.name,
          value: "",
          error: false,
          file: data.fileIs ? data.fileIs : "string",
          // charlimit: data.characterMaximum ? data.characterMaximum : "",
          errorText: "",
        };
      } else if (data.kind === inputTypes.multipleSelections) {
        return {
          name: data.name,
          value: [],
          error: false,
          file: data.fileIs ? data.fileIs : "string",
          // charlimit: data.characterMaximum ? data.characterMaximum : "",
          errorText: "",
        };
      } else if (
        data.characterMinimun &&
        data.characterMaximum &&
        data.verifyIfnotRepeated
      ) {
        return {
          name: data.name,
          value: "",
          error: false,
          file: data.fileIs ? data.fileIs : "string",
          charlimit: data.characterMaximum,
          charMinimum: data.characterMinimun,
          errorText: "",
          isRepited: false,
        };
      } else if (data.characterMaximum) {
        return {
          name: data.name,
          value: "",
          error: false,
          file: data.fileIs ? data.fileIs : "string",
          charlimit: data.characterMaximum,
          errorText: "",
        };
      } else if (data.characterMinimun) {
        return {
          name: data.name,
          value: "",
          error: false,
          file: data.fileIs ? data.fileIs : "string",
          charMinimum: data.characterMinimun,
          errorText: "",
        };
      } else {
        return;
      }
    })
    .filter((data: any) => data !== undefined);

  // const initialApi = initialForm.reduce((a: any, b: any) => ({ ...a, ...b }));

  return initialForm;
};