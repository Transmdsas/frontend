import * as Yup from "yup";
import ParametersFormModel from "./parametersFormModel";
const {
  formField: { configTypeId, referenceCodeId, isActive },
} = ParametersFormModel;

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  Yup.object().shape({
    [configTypeId.name]: Yup.string().required(
      `${configTypeId.requiredErrorMsg}`
    ),
    [referenceCodeId.name]: Yup.string()
      .nullable()
      .when(configTypeId.name, {
        is: (val: string) => val === "352" || val === "349",
        then: Yup.string().required(`${referenceCodeId.requiredErrorMsg}`),
      }),
    [isActive.name]: Yup.boolean().default(false),
  }),
];
