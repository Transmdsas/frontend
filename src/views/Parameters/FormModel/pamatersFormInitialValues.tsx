import ConfigFormModel from './parametersConfigFormModel';
const {
    formField: {
        id,
        referenceCodeId,
        isActive
    }
} = ConfigFormModel;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    [id.name]: '',
    [referenceCodeId.name]: '',
    [isActive.name]: true
};