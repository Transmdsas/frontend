import { AxiosInstance, AxiosResponse } from "axios";
import { createJsonInstance } from "../http-common";
import { DocList } from "../store/docsList/types";

class DocsListService {
  private jsonInstance: AxiosInstance;

  constructor() {
    this.jsonInstance = createJsonInstance();
  }

  getListByConfigId(documentConfigId: number): Promise<AxiosResponse<DocList[]>> {
    return this.jsonInstance.get(`/documentLists/${documentConfigId}`);
  }

  getListItem(documentConfigId: number, id: number): Promise<AxiosResponse<DocList>> {
    return this.jsonInstance.get(`/documentLists/${documentConfigId}/${id}`);
  }

  create(data: DocList): Promise<AxiosResponse<DocList>> {
    return this.jsonInstance.post("/documentLists", data);
  }

  update(documentConfigId: number, id: number, data: DocList): Promise<AxiosResponse<DocList>> {
    return this.jsonInstance.put(`/documentLists/${documentConfigId}/${id}`, data);
  }

  delete(documentConfigId: number, id: number): Promise<AxiosResponse<void>> {
    return this.jsonInstance.delete(`/documentLists/${documentConfigId}/${id}`);
  }
}

export default new DocsListService();
