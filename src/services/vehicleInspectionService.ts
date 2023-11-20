import { AxiosInstance, AxiosResponse } from "axios";
import { createJsonInstance, createFormDataInstance } from "../http-common";
import { VehicleInspection } from "../store/vehicles/types";

class VehiclesInspectionService {
  private jsonInstance: AxiosInstance;
  private formDataInstance: AxiosInstance;

  constructor() {
    this.jsonInstance = createJsonInstance();
    this.formDataInstance = createFormDataInstance();
  }

  getVehicleInspections(carPlate: string): Promise<AxiosResponse<VehicleInspection[]>> {
    return this.jsonInstance.get(`/vehicleInspections/${carPlate}`);
  }

  getInspection(inspectionId: number, carPlate: string): Promise<AxiosResponse<VehicleInspection>> {
    return this.jsonInstance.get(`/vehicleInspections/${carPlate}/${inspectionId}`);
  }

  createInspection(data: VehicleInspection): Promise<AxiosResponse<VehicleInspection>> {
    console.log(data);
    return this.formDataInstance.post("/vehicleInspections", data);
  }

  updateInspection(carPlate: string, inspectionId: number, data: VehicleInspection): Promise<AxiosResponse<VehicleInspection>> {
    return this.formDataInstance.put(`/vehicleInspections/${carPlate}/${inspectionId}`, data);
  }

  deleteInspection(carPlate: string, inspectionId: number): Promise<AxiosResponse<void>> {
    return this.jsonInstance.delete(`/vehicleInspections/${carPlate}/${inspectionId}`);
  }

}

export default new VehiclesInspectionService();
