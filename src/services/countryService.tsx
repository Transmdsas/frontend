import { AxiosInstance, AxiosResponse } from "axios";
import { createJsonInstance } from "../http-common";
import { Country } from "../store/countries/types";

class CountryService {
  private jsonInstance: AxiosInstance;

  constructor() {
    this.jsonInstance = createJsonInstance();
  }

  getAll(): Promise<AxiosResponse<Country[]>> {
    return this.jsonInstance.get("/countries");
  }

  get(id: number): Promise<AxiosResponse<Country>> {
    return this.jsonInstance.get(`/countries/${id}`);
  }

  create(data: Country): Promise<AxiosResponse<Country>> {
    return this.jsonInstance.post("/countries", data);
  }

  update(id: number, data: Country): Promise<AxiosResponse<Country>> {
    return this.jsonInstance.put(`/countries/${id}`, data);
  }

  delete(id: number): Promise<AxiosResponse<void>> {
    return this.jsonInstance.delete(`/countries/${id}`);
  }

  //   findByTitle(title) {
  //     return http.get(`/tutorials?title=${title}`);
  //   }
}

export default new CountryService();
