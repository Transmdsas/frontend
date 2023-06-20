export interface Driver {
  documentNumber: string;
  documentTypeId: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
  cellphone: string;
  email: string;
  bankCertification: string;
  bankId: number;
  address: string;
  cityId: number;
  rut: string;
  hasActivityRut: string;
  balances: boolean;
  advances: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DriversState {
  isLoading: boolean;
  error: string | null;
}

export interface DriverContact {
  id: number;
  driverId: string;
  fullName: string;
  cellphone: string;
  relationshipId: number;
}

export interface DriverReference {
  id: number;
  driverId: string;
  referenceTypeId: number;
  fullName: string;
  cellphone: string;
  relationshipId: number;
}

export interface DriverDocument {
  id: number;
  documentListId: number;
  driverId: string;
  observation: string | null;
  documentDueDate: Date | null;
  documentPath: File;
  createdAt: Date;
  updatedAt: Date;
}
