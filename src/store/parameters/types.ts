export interface Parameter {
  id: number;
  parameterTypeId: number;
  referenceCodeId: number | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ParameterState {
  isLoading: boolean;
  error: string | null;
  createdRecordId: number | null; 
}
