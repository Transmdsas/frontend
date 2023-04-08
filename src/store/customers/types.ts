export interface Customer {
    documentNumber: string,
    customerName: string,
    documentTypeId: number,
    birthDate: Date,
    cellphone: string,
    email: string, 
    address: string,
    cityId: number,
    createdAt: Date,
    updatedAt: Date
  };

  export interface CustomersState {
    isLoading: boolean,
    error: string | null
  }