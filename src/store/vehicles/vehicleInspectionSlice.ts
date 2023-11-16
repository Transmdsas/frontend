import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  EntityAdapter,
} from "@reduxjs/toolkit";
import inspectionService from "../../services/vehicleInspectionService";
import { VehicleInspection, VehiclesState } from "./types";
import { RootState } from "..";

export const getVehicleInspections = createAsyncThunk(
  "vehicleInspections/get",
  async (carPlate: string) => {
    const res = await inspectionService.getVehicleInspections(carPlate);
    return res.data;
  }
);

export const getInspection = createAsyncThunk(
  "vehicleInspections/getById",
  async ({ carPlate, inspectionId }: any) => {
    const res = await inspectionService.getInspection(inspectionId, carPlate);
    return res.data;
  }
);

export const createInspection = createAsyncThunk(
  "vehicleInspections/create",
  async (data: VehicleInspection, { rejectWithValue }) => {
    try {
      const res = await inspectionService.createInspection(data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateInspection = createAsyncThunk(
  "vehicleInspecitons/update",
  async ({ carPlate, inspectionId, data }: any, { rejectWithValue }) => {
    try {
      const res = await inspectionService.updateInspection(
        carPlate,
        inspectionId,
        data
      );
      return res.data;
    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
  }
);

export const deleteInspection = createAsyncThunk(
    "vehicleInspections/delete",
    async ({carPlate, inspectionId}:any,{rejectWithValue}) => {
        try {
            await inspectionService.deleteInspection(carPlate, inspectionId);
            return {inspectionId};
        } catch (err:any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const vehicleInspectionsAdapter: EntityAdapter<VehicleInspection> = 
createEntityAdapter<VehicleInspection>( {
    selectId: (vehicleInspection) => vehicleInspection.id,
    sortComparer: (a,b) => a.carPlate.localeCompare(b.carPlate)
});

export const vehicleInspectionsSelectors = 
vehicleInspectionsAdapter.getSelectors<RootState>(
    (state) => state.vehicleInspections
);

const initialState = vehicleInspectionsAdapter.getInitialState<VehiclesState>({
    isLoading: false,
    error: null,
  });
  
  const vehicleInspectionsSlice = createSlice({
    name: "vehicleInspections",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getVehicleInspections.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(getVehicleInspections.fulfilled, (state, action) => {
        state.isLoading = false;
        vehicleInspectionsAdapter.setAll(state, action.payload);
      });
      builder.addCase(getVehicleInspections.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
      builder.addCase(getInspection.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(getInspection.fulfilled, (state, action) => {
        state.isLoading = false;
        vehicleInspectionsAdapter.setOne(state, action.payload);
      });
      builder.addCase(getInspection.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
      builder.addCase(createInspection.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(createInspection.fulfilled, (state, action) => {
        state.isLoading = false;
        vehicleInspectionsAdapter.addOne(state, action.payload);
      });
      builder.addCase(createInspection.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Ocurrió un error guardando el vehículo";
      });
      builder.addCase(updateInspection.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(updateInspection.fulfilled, (state, action) => {
        state.isLoading = false;
        vehicleInspectionsAdapter.upsertOne(state, action.payload);
      });
      builder.addCase(updateInspection.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Ocurrió un error actualizando el vehículo";
      });
      builder.addCase(deleteInspection.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(deleteInspection.fulfilled, (state, action) => {
        state.isLoading = false;
        vehicleInspectionsAdapter.removeOne(state, action.payload.inspectionId);
      });
      builder.addCase(deleteInspection.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
    },
  });
  
  export const {
    selectAll: selectAllVehicleInspections,
    selectById: selectVehicleInspectionsById,
    selectIds: selectVehicleInspectionsIds,
  } = vehicleInspectionsAdapter.getSelectors<RootState>(
    (state) => state.vehicleInspections
  );
  
  export default vehicleInspectionsSlice.reducer;
  