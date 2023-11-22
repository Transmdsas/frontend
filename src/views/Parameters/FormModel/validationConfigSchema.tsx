import * as Yup from "yup";
import ParametersFormModel from "./parametersConfigFormModel";
const {
  formField: { id, referenceCodeId, isActive },
} = ParametersFormModel;

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  Yup.object().shape({
    [id.name]: Yup.string().required(
      `${id.requiredErrorMsg}`
    ),
    [referenceCodeId.name]: Yup.string()
      .nullable()
      .when(id.name, {
        is: (val: string) => val === "352" || val === "349",
        then: Yup.string().required(`${referenceCodeId.requiredErrorMsg}`),
      }),
    [isActive.name]: Yup.boolean().default(false),
  }),
];
