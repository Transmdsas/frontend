import { AxiosInstance, AxiosResponse } from "axios";
import { createJsonInstance } from "../http-common";
import { DriverReference } from "./../store/drivers/types";

class DriverReferencesService {
    private jsonInstance: AxiosInstance;
    
    constructor() {
       this.jsonInstance = createJsonInstance();
    }

    getDriverReferences(driverId: string): Promise<AxiosResponse<DriverReference[]>> {
        return this.jsonInstance.get(`/driverReferences/${driverId}`);
    }

    getReference(driverId: string, referenceId: number): Promise<AxiosResponse<DriverReference>> {
        return this.jsonInstance.get(`/driverReferences/${driverId}/${referenceId}`);
    }

    createReference(data: DriverReference): Promise<AxiosResponse<DriverReference>> {
        return this.jsonInstance.post('driverReferences', data);
    }

    updateReference(driverId: string, referenceId:number, data: DriverReference): Promise<AxiosResponse<DriverReference>> {
        return this.jsonInstance.put(`/driverReferences/${driverId}/${referenceId}`, data);
    }

    deleteReference(driverId: string, referenceId:number): Promise<AxiosResponse<DriverReference>> {
        return this.jsonInstance.delete(`/driverReferences/${driverId}/${referenceId}`);
    }
}

export default new DriverReferencesService();