export interface Value {
  id?: number;
  parameterId?: number;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ValuesState {
  isLoading: boolean;
  error: string | null;
}
