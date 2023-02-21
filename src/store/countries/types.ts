import { Department } from './../departments/types';

export interface Country {
  id: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CountriesState {
  isLoading: boolean;
  error: string | null;
  selectedCountry: number | null;
  departments: Department[];
}
