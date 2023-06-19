import { AxiosInstance, AxiosResponse } from "axios";
import { createJsonInstance } from "../http-common";
import { ParameterValues } from "../store/parametersValues/types";

class parametersValuesService {
  private jsonInstance: AxiosInstance;

  constructor() {
    this.jsonInstance = createJsonInstance();
  }

  getListByConfigId(parameterValueId: number): Promise<AxiosResponse<ParameterValues[]>> {
    return this.jsonInstance.get(`/parametersValue/${parameterValueId}`);
  }

  getListValues(parameterValueId: number, id: number): Promise<AxiosResponse<ParameterValues>> {
    return this.jsonInstance.get(`/parametersValue/${parameterValueId}/${id}`);
  }

  create(data: ParameterValues): Promise<AxiosResponse<ParameterValues>> {
    return this.jsonInstance.post("/parametersValue", data);
  }

  update(parameterValueId: number, id: number, data: ParameterValues): Promise<AxiosResponse<ParameterValues>> {
    return this.jsonInstance.put(`/parametersValue/${parameterValueId}/${id}`, data);
  }

  delete(parameterValueId: number, id: number): Promise<AxiosResponse<void>> {
    return this.jsonInstance.delete(`/parametersValue/${parameterValueId}/${id}`);
  }
}

export default new parametersValuesService();
