import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { getVehicles } from "./../../services/vehiclesService";

export const fetchVehicles = createAsyncThunk("vehicles/get", async () => {
  const res = await getVehicles();
  return res;
});

export const vehiclesAdapter = createEntityAdapter({
    selectId: (vehicle:any) =>  vehicle.carPlate,
});
const initialState: any = vehiclesAdapter.getInitialState();

const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchVehicles.fulfilled, vehiclesAdapter.upsertMany);
  },
});

export const {
    selectById: VehicleById,
    selectAll: AllVehicles
} = vehiclesAdapter.getSelectors((state:any) => state.vehicles);


export default vehiclesSlice.reducer;
