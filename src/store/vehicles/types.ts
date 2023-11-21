export interface Vehicle {
  carPlate: string;
  brandId: number;
  vehicleTypeId: number;
  vehicleCodeId: number;
  lineId: number;
  bodyWorkId: number;
  color: string;
  modelYear: number;
  serialNumber: string;
  netWeight: number;
  emptyWeight: number;
  repoweredTo: number;
  axles: number;
  propertyCard: string;
  fuelTypeId: number;
  countryId: number;
  frontPhoto: string;
  backPhoto: string;
  rightPhoto: string;
  leftPhoto: string;
  createdAt: Date;
  updatedAt: Date;
  destinations: number[];
}

export interface VehiclesState {
  isLoading: boolean;
  error: string | null;
}

export interface VehicleInspection {
  id: number;
  carPlate: string;
  controlNumber: string;
  runtNumber: string;
  dueDate: Date;
  diagnosticCenterId: number;
  observations: string;
  evidence: string;
  isActive: boolean;
}

export interface VehicleInsurance {
  id: number;
  carPlate: string;
  insuranceCompanyId: number;
  dueDate: Date;
  insuranceNumber: string;
  insuranceValue: number;
  insuranceTypeId: number;
  insuredValue: number;
  observations: string;
  evidence: string;
  isActive: boolean;
}

export interface VehicleCommunication {
  id: number;
  carPlate: string;
  webUri: string;
  user: string;
  password: string;
  otherOptions: string;
  principalPhone: string;
  secondaryPhone: string;
  observations: string;
}

export interface VehicleDocument {
  id: number;
  documentListId: number;
  carPlate: string;
  observation: string | null;
  documentDueDate: Date | null;
  documentPath: File;
  createdAt: Date;
  updatedAt: Date;
}

