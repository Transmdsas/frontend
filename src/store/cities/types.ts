import { Department } from "../departments/types";

export interface City {
  id: number;
  description: string;
  departmentId: number;
  createdAt: Date;
  updatedAt: Date;
  departmen: Department
}
