import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
  } from "@reduxjs/toolkit";
  import driversService from "../../services/driversService";
  import { Driver, DriversState } from './types';
  import { RootState } from "../index";
  
  
  export const getDrivers = createAsyncThunk("drivers/get", async () => {
    const res = await driversService.getAll();
    return res.data;
  });
  
  export const getDriverById = createAsyncThunk(
    "drivers/getById",
    async (id: number) => {
      const res = await driversService.get(id);
      return res.data;
    }
  );
  
  export const createDriver = createAsyncThunk("drivers/create", async (data: Driver) => {
    const res = await driversService.create(data);
    return res.data;
  });
  
  export const updateDriver = createAsyncThunk(
    "drivers/update",
    async ({ id, data }: any) => {
      const res = await driversService.update(id, data);
      return res.data;
    }
  );
  
  export const deleteDriver = createAsyncThunk(
    "drivers/delete",
    async ({ id }: any) => {
      await driversService.delete(id);
      return { id };
    }
  );
  
  export const driversAdapter = createEntityAdapter<Driver>({
    selectId: (driver) => driver.documentNumber,
    sortComparer: (a, b) => a.documentNumber.localeCompare(b.documentNumber)
  });
  export const driverSelectors = driversAdapter.getSelectors<RootState>((state) => state.drivers);
  
  
  const initialState = driversAdapter.getInitialState<DriversState>({
    isLoading: false,
    error: null
  });
  
  const driverSlice = createSlice({
    name: "drivers",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getDrivers.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(getDrivers.fulfilled, (state, action) => {
        state.isLoading = false;
        driversAdapter.setAll(state, action.payload);
      });
      builder.addCase(getDrivers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ocurrió un error consultando conductores';
      })
      builder.addCase(createDriver.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(createDriver.fulfilled, (state, action) => {
          state.isLoading = false;
          driversAdapter.addOne(state, action.payload);
      });
      builder.addCase(createDriver.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ocurrió un error guardando el conductor';
      });
      builder.addCase(updateDriver.fulfilled, (state, action) => {
        driversAdapter.upsertOne(state, action.payload);
      })
    },
  });
  
  export const {
      selectAll: selectAllDrivers,
      selectById: selectDriverById,
      selectIds: selectDriversId
  } = driversAdapter.getSelectors<RootState>((state) => state.drivers);
  
  
  export default driverSlice.reducer;