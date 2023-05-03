import { AxiosInstance, AxiosResponse } from "axios";
import { createJsonInstance, createFormDataInstance } from "../http-common";
import { HolderDocument } from "./../store/holders/types";

class HolderDocumentService {
  private jsonInstance: AxiosInstance;
  private formDataInstance: AxiosInstance;

  constructor() {
    this.jsonInstance = createJsonInstance();
    this.formDataInstance = createFormDataInstance();
  }

  getDocumentsByHolderId(
    holderId: string
  ): Promise<AxiosResponse<HolderDocument[]>> {
    return this.jsonInstance.get(`/holderDocuments/${holderId}`);
  }

  getHolderDocument(
    holderId: string,
    id: number
  ): Promise<AxiosResponse<HolderDocument>> {
    return this.jsonInstance.get(`/holderDocuments/${holderId}/${id}`);
  }

  create(data: HolderDocument): Promise<AxiosResponse<HolderDocument>> {
    return this.formDataInstance.post("/holderDocuments", data);
  }

  update(
    holderId: string,
    id: number,
    data: HolderDocument
  ): Promise<AxiosResponse<HolderDocument>> {
    return this.jsonInstance.put(`/holderDocuments/${holderId}/${id}`, data);
  }

  delete(holderId: string, id: number): Promise<AxiosResponse<void>> {
    return this.jsonInstance.delete(`/holderDocuments/${holderId}/${id}`);
  }
}

export default new HolderDocumentService();
