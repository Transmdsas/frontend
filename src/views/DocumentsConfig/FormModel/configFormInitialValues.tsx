import ConfigFormModel from './docsConfigFormModel';
const {
    formField: {
        configTypeId,
        referenceCodeId,
        isActive
    }
} = ConfigFormModel;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    [configTypeId.name]: '',
    [referenceCodeId.name]: '',
    [isActive.name]: true
};