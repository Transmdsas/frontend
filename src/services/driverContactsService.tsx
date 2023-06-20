import { AxiosInstance, AxiosResponse } from "axios";
import { createJsonInstance } from "../http-common";
import { DriverContact } from "./../store/drivers/types";

class DriverContactsService {
    private jsonInstance: AxiosInstance;
    
    constructor() {
       this.jsonInstance = createJsonInstance();
    }

    getDriverContacts(driverId: string): Promise<AxiosResponse<DriverContact[]>> {
        return this.jsonInstance.get(`/driverContacts/${driverId}`);
    }

    getContact(driverId: string, contactId: number): Promise<AxiosResponse<DriverContact>> {
        return this.jsonInstance.get(`/driverContacts/${driverId}/${contactId}`);
    }

    createContact(data: DriverContact): Promise<AxiosResponse<DriverContact>> {
        return this.jsonInstance.post('driverContacts', data);
    }

    updateContact(driverId: string, contactId:number, data: DriverContact): Promise<AxiosResponse<DriverContact>> {
        return this.jsonInstance.put(`/driverContacts/${driverId}/${contactId}`, data);
    }

    deleteContact(driverId: string, contactId:number): Promise<AxiosResponse<DriverContact>> {
        return this.jsonInstance.delete(`/driverContacts/${driverId}/${contactId}`);
    }
}

export default new DriverContactsService();