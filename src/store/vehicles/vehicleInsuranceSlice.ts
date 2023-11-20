import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
    EntityAdapter,
  } from "@reduxjs/toolkit";
  import insuranceService from "../../services/vehicleInsuranceService";
  import { VehicleInsurance, VehiclesState } from "./types";
  import { RootState } from "..";
  
  export const getVehicleInsurances = createAsyncThunk(
    "vehicleInsurances/get",
    async (carPlate: string) => {
      const res = await insuranceService.getVehicleInsurances(carPlate);
      return res.data;
    }
  );
  
  export const getInsurance = createAsyncThunk(
    "vehicleInsurances/getById",
    async ({ carPlate, insuranceId }: any) => {
      const res = await insuranceService.getInsurance(insuranceId, carPlate);
      return res.data;
    }
  );
  
  export const createInsurance = createAsyncThunk(
    "vehicleInsurances/create",
    async (data: VehicleInsurance, { rejectWithValue }) => {
      try {
        const res = await insuranceService.createInsurance(data);
        return res.data;
      } catch (err: any) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  
  export const updateInsurance = createAsyncThunk(
    "vehicleInsurances/update",
    async ({ carPlate, insuranceId, data }: any, { rejectWithValue }) => {
      try {
        const res = await insuranceService.updateInsurance(
          carPlate,
          insuranceId,
          data
        );
        return res.data;
      } catch (err: any) {
          return rejectWithValue(err.response.data);
      }
    }
  );
  
  export const deleteInsurance = createAsyncThunk(
      "vehicleInsurances/delete",
      async ({carPlate, insuranceId}:any,{rejectWithValue}) => {
          try {
              await insuranceService.deleteInsurance(carPlate, insuranceId);
              return {insuranceId};
          } catch (err:any) {
              return rejectWithValue(err.response.data);
          }
      }
  );
  
  export const vehicleInsurancesAdapter: EntityAdapter<VehicleInsurance> = 
  createEntityAdapter<VehicleInsurance>( {
      selectId: (vehicleInsurance) => vehicleInsurance.id,
      sortComparer: (a,b) => a.carPlate.localeCompare(b.carPlate)
  });
  
  export const vehicleInsurancesSelectors = 
  vehicleInsurancesAdapter.getSelectors<RootState>(
      (state) => state.vehicleInsurances
  );
  
  const initialState = vehicleInsurancesAdapter.getInitialState<VehiclesState>({
      isLoading: false,
      error: null,
    });
    
    const vehicleInsurancesSlice = createSlice({
      name: "vehicleInsurances",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
        builder.addCase(getVehicleInsurances.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getVehicleInsurances.fulfilled, (state, action) => {
          state.isLoading = false;
          vehicleInsurancesAdapter.setAll(state, action.payload);
        });
        builder.addCase(getVehicleInsurances.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message || null;
        });
        builder.addCase(getInsurance.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getInsurance.fulfilled, (state, action) => {
          state.isLoading = false;
          vehicleInsurancesAdapter.setOne(state, action.payload);
        });
        builder.addCase(getInsurance.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message || null;
        });
        builder.addCase(createInsurance.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(createInsurance.fulfilled, (state, action) => {
          state.isLoading = false;
          vehicleInsurancesAdapter.addOne(state, action.payload);
        });
        builder.addCase(createInsurance.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error?.message || "Ocurrió un error guardando el vehículo";
        });
        builder.addCase(updateInsurance.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(updateInsurance.fulfilled, (state, action) => {
          state.isLoading = false;
          vehicleInsurancesAdapter.upsertOne(state, action.payload);
        });
        builder.addCase(updateInsurance.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error?.message || "Ocurrió un error actualizando el vehículo";
        });
        builder.addCase(deleteInsurance.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(deleteInsurance.fulfilled, (state, action) => {
          state.isLoading = false;
          vehicleInsurancesAdapter.removeOne(state, action.payload.insuranceId);
        });
        builder.addCase(deleteInsurance.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message || null;
        });
      },
    });
    
    export const {
      selectAll: selectAllVehicleInsurances,
      selectById: selectVehicleInsurancesById,
      selectIds: selectVehicleInsurancesIds,
    } = vehicleInsurancesAdapter.getSelectors<RootState>(
      (state) => state.vehicleInsurances
    );
    
    export default vehicleInsurancesSlice.reducer;
    