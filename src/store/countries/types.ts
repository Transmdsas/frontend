export interface Country {
  id: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CountriesState {
  isLoading: boolean;
  error: string | null;
}
