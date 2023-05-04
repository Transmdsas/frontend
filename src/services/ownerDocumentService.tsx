import { AxiosInstance, AxiosResponse } from "axios";
import { createJsonInstance, createFormDataInstance } from "../http-common";
import { OwnerDocument } from "./../store/owners/types";

class OwnerDocumentService {
    private jsonInstance: AxiosInstance;
    private formDataInstance: AxiosInstance;
  
    constructor() {
      this.jsonInstance = createJsonInstance();
      this.formDataInstance = createFormDataInstance();
    }
  
    
  getDocumentsByOwnerId(
    ownerId: string
  ): Promise<AxiosResponse<OwnerDocument[]>> {
    return this.jsonInstance.get(`/ownerDocuments/${ownerId}`);
  }

  getOwnerDocument(
    ownerId: string,
    id: number
  ): Promise<AxiosResponse<OwnerDocument>> {
    return this.jsonInstance.get(`/ownerDocuments/${ownerId}/${id}`);
  }

  create(data: OwnerDocument): Promise<AxiosResponse<OwnerDocument>> {
    return this.formDataInstance.post("/ownerDocuments", data);
  }

  update(
    ownerId: string,
    id: number,
    data: OwnerDocument
  ): Promise<AxiosResponse<OwnerDocument>> {
    return this.jsonInstance.put(`/ownerDocuments/${ownerId}/${id}`, data);
  }

  delete(ownerId: string, id: number): Promise<AxiosResponse<void>> {
    return this.jsonInstance.delete(`/ownerDocuments/${ownerId}/${id}`);
  }
}

export default new OwnerDocumentService();