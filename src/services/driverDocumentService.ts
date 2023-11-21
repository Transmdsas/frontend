import { AxiosInstance, AxiosResponse } from "axios";
import { createJsonInstance, createFormDataInstance } from "../http-common";
import { DriverDocument } from "../store/drivers/types";

class DriverDocumentService {
  private jsonInstance: AxiosInstance;
  private formDataInstance: AxiosInstance;

  constructor() {
    this.jsonInstance = createJsonInstance();
    this.formDataInstance = createFormDataInstance();
  }

  getDocumentsByDriverId(
    driverId: string
  ): Promise<AxiosResponse<DriverDocument[]>> {
    return this.jsonInstance.get(`/driverDocuments/${driverId}`);
  }

  getDriverDocument(
    driverId: string,
    id: number
  ): Promise<AxiosResponse<DriverDocument>> {
    return this.jsonInstance.get(`/driverDocuments/${driverId}/${id}`);
  }

  create(data: DriverDocument): Promise<AxiosResponse<DriverDocument>> {
    return this.formDataInstance.post("/driverDocuments", data);
  }

  update(
    driverId: string,
    id: number,
    data: DriverDocument
  ): Promise<AxiosResponse<DriverDocument>> {
    return this.jsonInstance.put(`/driverDocuments/${driverId}/${id}`, data);
  }

  delete(driverId: string, id: number): Promise<AxiosResponse<void>> {
    return this.jsonInstance.delete(`/driverDocuments/${driverId}/${id}`);
  }
}

export default new DriverDocumentService();
