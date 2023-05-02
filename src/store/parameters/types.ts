import { Value } from "../values/types";

export interface Parameter {
  id: number;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  values?: Value[];
}

export interface ParametersState {
  isLoading: boolean;
  error: string | null;
}
