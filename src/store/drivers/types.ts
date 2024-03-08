import { City } from "../cities/types";
import { DocList } from "../docsList/types";
import { Value } from "../values/types";

export interface Driver {
  documentNumber: string;
  documentTypeId: number;
  firstName: string;
  driverCodeId: number;
  experienceYears: number;
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
  advancePayment: string;
  avatar: string;
  balances: boolean;
  advances: boolean;
  createdAt: Date;
  updatedAt: Date;
  documentType: Value;
  driverCode: Value;
  licenceCategory: Value;
  bank: Value;
  city: City;
  licenceDueDate: Date;
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
  relationship: string;
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
  documentList: DocList;
}
