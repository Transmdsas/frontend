export interface Vehicle {
    documentNumber: string,
    documentTypeId: number,
    firstName: string,
    lastName: string,
    birthDate: Date,
    cellphone: string,
    email: string, 
    bankCertification: string,
    bankId: number,
    address: string,
    cityId: number,
    rut: string,
    hasActivityRut: string,
    balances: boolean,
    advances: boolean,
    createdAt: Date,
    updatedAt: Date
  };

  export interface VehiclesState {
    isLoading: boolean,
    error: string | null
  }