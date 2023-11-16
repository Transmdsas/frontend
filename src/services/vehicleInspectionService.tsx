import { AxiosInstance, AxiosResponse } from "axios";
import { createJsonInstance, createFormDataInstance } from "../http-common";
import { VehicleInspection } from "./../store/vehicles/types";

class VehiclesInspectionService {
  private jsonInstance: AxiosInstance;
  private formDataInstance: AxiosInstance;

  constructor() {
    this.jsonInstance = createJsonInstance();
    this.formDataInstance = createFormDataInstance();
  }

  getVehicleInspections(carPlate: string): Promise<AxiosResponse<VehicleInspection[]>> {
    return this.jsonInstance.get(`/vehicleInspection/${carPlate}`);
  }

  getInspection(inspectionId: number, carPlate: string): Promise<AxiosResponse<VehicleInspection>> {
    return this.jsonInstance.get(`/vehicleInspection/${carPlate}/${inspectionId}`);
  }

  createInspection(data: VehicleInspection): Promise<AxiosResponse<VehicleInspection>> {
    console.log(data);
    return this.formDataInstance.post("/vehicleInspection", data);
  }

  updateInspection(carPlate: string, inspectionId: number, data: VehicleInspection): Promise<AxiosResponse<VehicleInspection>> {
    return this.formDataInstance.put(`/vehicleInspection/${carPlate}/${inspectionId}`, data);
  }

  deleteInspection(carPlate: string, inspectionId: number): Promise<AxiosResponse<void>> {
    return this.jsonInstance.delete(`/vehicleInspection/${carPlate}/${inspectionId}`);
  }

}

export default new VehiclesInspectionService();
