export interface Vehicle {
    carPlate: string,
    brandId: number,
    vehicleTypeId: number,
    vehicleCodeId: number,
    lineId: number,
    bodyWorkId: number,
    color: string, 
    modelYear: number,
    serialNumber: string,
    netWeight: number,
    emptyWeight: number,
    repoweredTo: number,
    axles: number,
    propertyCard: string,
    fuelTypeId: number,
    countryId: number,
    frontPhoto: string,
    backPhoto: string,
    rightPhoto: string,
    leftPhoto: string,
    createdAt: Date,
    updatedAt: Date, 
    destinations: number[]
  };

  export interface VehiclesState {
    isLoading: boolean,
    error: string | null
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