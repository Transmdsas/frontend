import { City } from "../cities/types";
import { DocList } from "../docsList/types";
import { Value } from "../values/types";

export interface Holder {
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
  documentType: Value;
  city: City;
  bank: Value;
  contractType: Value;
  contractFile: string;
}

export interface HoldersState {
  isLoading: boolean;
  error: string | null;
}

export interface HolderDocument {
  id: number;
  documentListId: number;
  holderId: string;
  observation: string | null;
  documentDueDate: Date | null;
  documentPath: File;
  createdAt: Date;
  updatedAt: Date;
  documentList: DocList;
}
