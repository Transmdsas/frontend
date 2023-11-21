import { AxiosInstance, AxiosResponse } from "axios";
import { createJsonInstance, createFormDataInstance } from "../http-common";
import { VehicleDocument } from "../store/vehicles/types";

class VehicleDocumentService {
  private jsonInstance: AxiosInstance;
  private formDataInstance: AxiosInstance;

  constructor() {
    this.jsonInstance = createJsonInstance();
    this.formDataInstance = createFormDataInstance();
  }

  getDocumentsByCarPlate(
    carPlate: string
  ): Promise<AxiosResponse<VehicleDocument[]>> {
    return this.jsonInstance.get(`/vehicleDocuments/${carPlate}`);
  }

  getVehicleDocument(
    carPlate: string,
    id: number
  ): Promise<AxiosResponse<VehicleDocument>> {
    return this.jsonInstance.get(`/vehicleDocuments/${carPlate}/${id}`);
  }

  create(data: VehicleDocument): Promise<AxiosResponse<VehicleDocument>> {
    return this.formDataInstance.post("/vehicleDocuments", data);
  }

  update(
    carPlate: string,
    id: number,
    data: VehicleDocument
  ): Promise<AxiosResponse<VehicleDocument>> {
    return this.jsonInstance.put(`/vehicleDocuments/${carPlate}/${id}`, data);
  }

  delete(carPlate: string, id: number): Promise<AxiosResponse<void>> {
    return this.jsonInstance.delete(`/vehicleDocuments/${carPlate}/${id}`);
  }
}

export default new VehicleDocumentService();
