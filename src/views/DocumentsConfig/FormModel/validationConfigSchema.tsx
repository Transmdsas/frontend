import * as Yup from 'yup';
import ConfigFormModel from './docsConfigFormModel';
const {
    formField: {
        configTypeId,
        referenceCodeId,
        isActive
    }
} = ConfigFormModel;

// eslint-disable-next-line import/no-anonymous-default-export
export default [
    Yup.object().shape({
        [configTypeId.name]: Yup.string().required(`${configTypeId.requiredErrorMsg}`),
        [referenceCodeId.name]: Yup.string().nullable(),
        [isActive.name]: Yup.boolean().default(false),
    })
];