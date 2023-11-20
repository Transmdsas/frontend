import { AxiosInstance, AxiosResponse } from "axios";
import { createJsonInstance } from "../http-common";
import { VehicleCommunication } from "./../store/vehicles/types";

class VehicleCommunicationService {
  private jsonInstance: AxiosInstance;

  constructor() {
    this.jsonInstance = createJsonInstance();
  }

  getVehicleCommunications(carPlate: string): Promise<AxiosResponse<VehicleCommunication[]>> {
    return this.jsonInstance.get(`/vehicleCommunications/${carPlate}`);
  }

  getCommunication(communicationId: number, carPlate: string): Promise<AxiosResponse<VehicleCommunication>> {
    return this.jsonInstance.get(`/vehicleCommunications/${carPlate}/${communicationId}`);
  }

  createCommunication(data: VehicleCommunication): Promise<AxiosResponse<VehicleCommunication>> {
    console.log(data);
    return this.jsonInstance.post("/vehicleCommunications", data);
  }

  updateCommunication(carPlate: string, communicationId: number, data: VehicleCommunication): Promise<AxiosResponse<VehicleCommunication>> {
    return this.jsonInstance.put(`/vehicleCommunications/${carPlate}/${communicationId}`, data);
  }

  deleteCommunication(carPlate: string, communicationId: number): Promise<AxiosResponse<void>> {
    return this.jsonInstance.delete(`/vehicleCommunications/${carPlate}/${communicationId}`);
  }

}

export default new VehicleCommunicationService();
