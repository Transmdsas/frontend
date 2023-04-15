import * as Yup from "yup";
import ConfigFormModel from "./docsConfigFormModel";
const {
  formField: { configTypeId, referenceCodeId, isActive },
} = ConfigFormModel;

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
