import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import customersService from "../../services/customerService";
import { Customer, CustomersState } from './types';
import { RootState } from "../index";


export const getCustomers = createAsyncThunk("customers/get", async () => {
  const res = await customersService.getAll();
  return res.data;
});

export const getCustomerById = createAsyncThunk(
  "customers/getById",
  async (id: number) => {
    const res = await customersService.get(id);
    return res.data;
  }
);

export const createCustomer = createAsyncThunk("customers/create", async (data: Customer) => {
  const res = await customersService.create(data);
  return res.data;
});

export const updateCustomer = createAsyncThunk(
  "customers/update",
  async ({ id, data }: any) => {
    const res = await customersService.update(id, data);
    return res.data;
  }
);

export const deleteCustomer = createAsyncThunk(
  "customers/delete",
  async ({ id }: any) => {
    await customersService.delete(id);
    return { id };
  }
);

export const customersAdapter = createEntityAdapter<Customer>({
  selectId: (customer) => customer.documentNumber,
  sortComparer: (a, b) => a.documentNumber.localeCompare(b.documentNumber)
});
export const customerSelectors = customersAdapter.getSelectors<RootState>((state) => state.customers);


const initialState = customersAdapter.getInitialState<CustomersState>({
  isLoading: false,
  error: null
});

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCustomers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCustomers.fulfilled, (state, action) => {
      state.isLoading = false;
      customersAdapter.setAll(state, action.payload);
    });
    builder.addCase(getCustomers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? 'Ocurrió un error consultando Tenedores';
    })
    builder.addCase(createCustomer.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        customersAdapter.addOne(state, action.payload);
    });
    builder.addCase(createCustomer.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? 'Ocurrió un error guardando el tenedor';
    });
    builder.addCase(updateCustomer.fulfilled, (state, action) => {
      customersAdapter.upsertOne(state, action.payload);
    })
  },
});

export const {
    selectAll: selectAllCustomers,
    selectById: selectCustomerById,
    selectIds: selectCustomersId
} = customersAdapter.getSelectors<RootState>((state) => state.customers);


export default customersSlice.reducer;