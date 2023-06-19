export interface ParameterValues {
    id: number;
    parameterValuesId: number;
    valueName: string;
    valueDescription: string | null;
    isRequired: boolean;
    needDueDate: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface ParameterValuesState {
    isLoading: boolean;
    error: string | null;
  }
  