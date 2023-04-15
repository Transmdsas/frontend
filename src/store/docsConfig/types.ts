export interface DocConfig {
  id: number;
  configTypeId: number;
  referenceCodeId: number | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DocsConfigState {
  isLoading: boolean;
  error: string | null;
  createdRecordId: number | null; 
}
