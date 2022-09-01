import { inputTypes } from "../types/Types";

export const createObjets = (inputs: any) => {
  const initialForm = inputs
    .map((data: any) => {
      if (
        data.kind !== inputTypes.divider &&
        data.kind !== inputTypes.multipleSelections
      ) {
        return { name: data.name, value: "", error: false };
      } else if (data.kind === inputTypes.multipleSelections) {
        return { name: data.name, value: [], error: false };
      } else {
        return;
      }
    })
    .filter((data: any) => data !== undefined);

  const initialApiArr = inputs
    .map((data: any) => {
      if (
        data.kind !== inputTypes.divider &&
        data.kind !== inputTypes.multipleSelections
      ) {
        return { [data.name]: "" };
      } else if (data.kind === inputTypes.multipleSelections) {
        return { [data.name]: [] };
      } else {
        return;
      }
    })
    .filter((data: any) => data !== undefined);

  const initialApi = initialApiArr.reduce((a: any, b: any) => ({ ...a, ...b }));

  return { initialForm, initialApi };
};
