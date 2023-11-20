import { AxiosInstance, AxiosResponse } from "axios";
import { createJsonInstance, createFormDataInstance } from "../http-common";
import { VehicleInsurance } from "./../store/vehicles/types";

class VehicleInsuranceService {
  private jsonInstance: AxiosInstance;
  private formDataInstance: AxiosInstance;

  constructor() {
    this.jsonInstance = createJsonInstance();
    this.formDataInstance = createFormDataInstance();
  }

  getVehicleInsurances(carPlate: string): Promise<AxiosResponse<VehicleInsurance[]>> {
    return this.jsonInstance.get(`/vehicleInsurance/${carPlate}`);
  }

  getInsurance(inspectionId: number, carPlate: string): Promise<AxiosResponse<VehicleInsurance>> {
    return this.jsonInstance.get(`/vehicleInsurance/${carPlate}/${inspectionId}`);
  }

  createInsurance(data: VehicleInsurance): Promise<AxiosResponse<VehicleInsurance>> {
    console.log(data);
    return this.formDataInstance.post("/vehicleInsurance", data);
  }

  updateInsurance(carPlate: string, inspectionId: number, data: VehicleInsurance): Promise<AxiosResponse<VehicleInsurance>> {
    return this.formDataInstance.put(`/vehicleInsurance/${carPlate}/${inspectionId}`, data);
  }

  deleteInsurance(carPlate: string, inspectionId: number): Promise<AxiosResponse<void>> {
    return this.jsonInstance.delete(`/vehicleInsurance/${carPlate}/${inspectionId}`);
  }

}

export default new VehicleInsuranceService();
