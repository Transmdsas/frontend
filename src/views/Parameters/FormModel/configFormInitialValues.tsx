import ParametersFormModel from './parametersFormModel';
const {
    formField: {
        configTypeId,
        referenceCodeId,
        isActive
    }
} = ParametersFormModel;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    [configTypeId.name]: '',
    [referenceCodeId.name]: '',
    [isActive.name]: true
};
