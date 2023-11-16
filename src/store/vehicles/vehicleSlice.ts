import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import vehiclesService from "../../services/vehiclesService";
import { Vehicle, VehiclesState } from "./types";
import { RootState } from "../index";

export const getVehicles = createAsyncThunk("vehicles/get", async () => {
  const res = await vehiclesService.getAll();
  return res.data;
});

export const getVehicleById = createAsyncThunk(
  "vehicles/getById",
  async (id: number) => {
    const res = await vehiclesService.get(id);
    return res.data;
  }
);

export const createVehicle = createAsyncThunk(
  "vehicles/create",
  async (data: Vehicle, { rejectWithValue }) => {
    try {
      const res = await vehiclesService.create(data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateVehicle = createAsyncThunk(
  "vehicles/update",
  async ({ id, data }: any) => {
    const res = await vehiclesService.update(id, data);
    return res.data;
  }
);

export const deleteVehicle = createAsyncThunk(
  "vehicles/delete",
  async ({ id }: any) => {
    await vehiclesService.delete(id);
    return { id };
  }
);

export const vehiclesAdapter = createEntityAdapter<Vehicle>({
  selectId: (vehicle) => vehicle.carPlate,
  sortComparer: (a, b) => a.carPlate.localeCompare(b.carPlate),
});
export const vehicleSelectors = vehiclesAdapter.getSelectors<RootState>(
  (state) => state.vehicles
);

const initialState = vehiclesAdapter.getInitialState<VehiclesState>({
  isLoading: false,
  error: null,
});

const vehicleSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getVehicles.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getVehicles.fulfilled, (state, action) => {
      state.isLoading = false;
      vehiclesAdapter.setAll(state, action.payload);
    });
    builder.addCase(getVehicles.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        action.error.message ?? "Ocurrió un error consultando Vehículos";
    });
    builder.addCase(createVehicle.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createVehicle.fulfilled, (state, action) => {
      state.isLoading = false;
      vehiclesAdapter.addOne(state, action.payload);
    });
    builder.addCase(createVehicle.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error?.message || "Ocurrió un error guardando el vehículo";
    });
    builder.addCase(updateVehicle.fulfilled, (state, action) => {
      vehiclesAdapter.upsertOne(state, action.payload);
    });
  },
});

export const {
  selectAll: selectAllVehicles,
  selectById: selectVehicleById,
  selectIds: selectVehiclesId,
} = vehiclesAdapter.getSelectors<RootState>((state) => state.vehicles);

export default vehicleSlice.reducer;
