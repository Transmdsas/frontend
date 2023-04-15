export interface DocList {
    id: number;
    documentConfigId: number;
    documentName: string;
    documentDescription: string | null;
    isRequired: boolean;
    needDueDate: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface DocsListState {
    isLoading: boolean;
    error: string | null;
  }
  