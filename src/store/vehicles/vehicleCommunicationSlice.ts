import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
    EntityAdapter,
  } from "@reduxjs/toolkit";
  import communicationService from "../../services/vehicleCommunicationsService";
  import { VehicleCommunication, VehiclesState } from "./types";
  import { RootState } from "..";
  
  export const getVehicleCommunications = createAsyncThunk(
    "vehicleCommunications/get",
    async (carPlate: string) => {
      const res = await communicationService.getVehicleCommunications(carPlate);
      return res.data;
    }
  );
  
  export const getCommunication = createAsyncThunk(
    "vehicleCommunications/getById",
    async ({ carPlate, communicationId }: any) => {
      const res = await communicationService.getCommunication(communicationId, carPlate);
      return res.data;
    }
  );
  
  export const createCommunication = createAsyncThunk(
    "vehicleCommunications/create",
    async (data: VehicleCommunication, { rejectWithValue }) => {
      try {
        const res = await communicationService.createCommunication(data);
        return res.data;
      } catch (err: any) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  
  export const updateCommunication = createAsyncThunk(
    "vehicleCommunications/update",
    async ({ carPlate, communicationId, data }: any, { rejectWithValue }) => {
      try {
        const res = await communicationService.updateCommunication(
          carPlate,
          communicationId,
          data
        );
        return res.data;
      } catch (err: any) {
          return rejectWithValue(err.response.data);
      }
    }
  );
  
  export const deleteCommunication = createAsyncThunk(
      "vehicleCommunications/delete",
      async ({carPlate, communicationId}:any,{rejectWithValue}) => {
          try {
              await communicationService.deleteCommunication(carPlate, communicationId);
              return {communicationId};
          } catch (err:any) {
              return rejectWithValue(err.response.data);
          }
      }
  );
  
  export const vehicleCommunicationsAdapter: EntityAdapter<VehicleCommunication> = 
  createEntityAdapter<VehicleCommunication>( {
      selectId: (vehicleCommunication) => vehicleCommunication.id,
      sortComparer: (a,b) => a.carPlate.localeCompare(b.carPlate)
  });
  
  export const vehicleCommunicationsSelectors = 
  vehicleCommunicationsAdapter.getSelectors<RootState>(
      (state) => state.vehicleCommunications
  );
  
  const initialState = vehicleCommunicationsAdapter.getInitialState<VehiclesState>({
      isLoading: false,
      error: null,
    });
    
    const vehicleCommunicationsSlice = createSlice({
      name: "vehicleCommunications",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
        builder.addCase(getVehicleCommunications.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getVehicleCommunications.fulfilled, (state, action) => {
          state.isLoading = false;
          vehicleCommunicationsAdapter.setAll(state, action.payload);
        });
        builder.addCase(getVehicleCommunications.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message || null;
        });
        builder.addCase(getCommunication.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getCommunication.fulfilled, (state, action) => {
          state.isLoading = false;
          vehicleCommunicationsAdapter.setOne(state, action.payload);
        });
        builder.addCase(getCommunication.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message || null;
        });
        builder.addCase(createCommunication.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(createCommunication.fulfilled, (state, action) => {
          state.isLoading = false;
          vehicleCommunicationsAdapter.addOne(state, action.payload);
        });
        builder.addCase(createCommunication.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error?.message || "Ocurrió un error guardando el vehículo";
        });
        builder.addCase(updateCommunication.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(updateCommunication.fulfilled, (state, action) => {
          state.isLoading = false;
          vehicleCommunicationsAdapter.upsertOne(state, action.payload);
        });
        builder.addCase(updateCommunication.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error?.message || "Ocurrió un error actualizando el vehículo";
        });
        builder.addCase(deleteCommunication.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(deleteCommunication.fulfilled, (state, action) => {
          state.isLoading = false;
          vehicleCommunicationsAdapter.removeOne(state, action.payload.communicationId);
        });
        builder.addCase(deleteCommunication.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message || null;
        });
      },
    });
    
    export const {
      selectAll: selectAllVehicleCommunications,
      selectById: selectVehicleCommunicationsById,
      selectIds: selectVehicleCommunicationsIds,
    } = vehicleCommunicationsAdapter.getSelectors<RootState>(
      (state) => state.vehicleCommunications
    );
    
    export default vehicleCommunicationsSlice.reducer;
    