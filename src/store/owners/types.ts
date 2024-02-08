import { City } from "../cities/types";
import { DocList } from "../docsList/types";
import { Value } from "../values/types";

export interface Owner {
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
}

export interface OwnersState {
  isLoading: boolean;
  error: string | null;
}

export interface OwnerDocument {
  id: number;
  documentListId: number;
  ownerId: string;
  observation: string | null;
  documentDueDate: Date | null;
  documentPath: File;
  createdAt: Date;
  updatedAt: Date;
  documentList: DocList;
}
