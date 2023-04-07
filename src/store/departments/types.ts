import { City } from "../cities/types";

export interface Department {
  id: number;
  description: string;
  countryId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DepartmentsState {
  isLoading: boolean;
  error: string | null;
  selectedDepartment: number | null;
  cities: City[];
}
