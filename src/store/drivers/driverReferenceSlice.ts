import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
    EntityAdapter,
  } from "@reduxjs/toolkit";
  import referencesService from "../../services/driverReferencesService";
  import { DriverReference, DriversState } from "./types";
  import { RootState } from "..";
  
  export const getDriverReferences = createAsyncThunk(
    "driverReferences/get",
    async (driverId: string) => {
      const res = await referencesService.getDriverReferences(driverId);
      return res.data;
    }
  );
  
  export const getReference = createAsyncThunk(
    "driverReferences/getById",
    async ({ driverId, referenceId }: any) => {
      const res = await referencesService.getReference(driverId, referenceId);
      return res.data;
    }
  );
  
  export const createReference = createAsyncThunk(
    "driverReferences/create",
    async (data: DriverReference) => {
      const res = await referencesService.createReference(data);
      return res.data;
    }
  );
  
  export const updateReference = createAsyncThunk(
    "driverReferences/update",
    async ({ driverId, referenceId, data }: any) => {
      const res = await referencesService.updateReference(driverId, referenceId, data);
      return res.data;
    }
  );
  
  export const deleteReference = createAsyncThunk(
    "driverReferences/delete",
    async ({ driverId, referenceId }: any) => {
      await referencesService.deleteReference(driverId, referenceId);
      return { referenceId };
    }
  );
  
  export const driverReferencesAdapter: EntityAdapter<DriverReference> =
  createEntityAdapter<DriverReference>({
      selectId: (driverReference) => driverReference.id,
      sortComparer: (a, b) => a.fullName.localeCompare(b.fullName),
  });
  
  export const driverReferencesSelectors =
  driverReferencesAdapter.getSelectors<RootState>(
      (state) => state.driverReferences
  );
  
  const initialState = driverReferencesAdapter.getInitialState<DriversState>({
      isLoading: false,
      error: null,
  });
  
  const driverReferencesSlice = createSlice({
      name: "driverReferences",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
          builder.addCase(getDriverReferences.pending, (state) => {
              state.isLoading = true;
          });
          builder.addCase(getDriverReferences.fulfilled, (state, action) => {
              state.isLoading = false;
              driverReferencesAdapter.setAll(state, action.payload);
          });
          builder.addCase(getDriverReferences.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.error.message || null;
          });
          builder.addCase(getReference.pending, (state) => {
              state.isLoading = true;
          });
          builder.addCase(getReference.fulfilled, (state, action) => {
              state.isLoading = false;
              driverReferencesAdapter.setOne(state, action.payload);
          });
          builder.addCase(getReference.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.error.message || null;
          });
          builder.addCase(createReference.pending, (state) => {
              state.isLoading = true;
          });
          builder.addCase(createReference.fulfilled, (state, action) => {
              state.isLoading = false;
              driverReferencesAdapter.addOne(state, action.payload);
          });
          builder.addCase(createReference.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.error.message || null;
          });
          builder.addCase(updateReference.pending, (state) => {
              state.isLoading = true;
          });
          builder.addCase(updateReference.fulfilled, (state, action) => {
              state.isLoading = false;
              driverReferencesAdapter.upsertOne(state, action.payload);
          });
          builder.addCase(updateReference.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.error.message || null;
          });
          builder.addCase(deleteReference.pending, (state) => {
              state.isLoading = true;
          });
          builder.addCase(deleteReference.fulfilled, (state, action) => {
              state.isLoading = false;
              driverReferencesAdapter.removeOne(state, action.payload.referenceId);
          });
          builder.addCase(deleteReference.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.error.message || null;
          });
      }
  });
  
  export const {
      selectAll: selectAllDriverReferences,
      selectById: selectDriverReferencesById,
      selectIds: selectDriverReferenceIds,
  } = driverReferencesAdapter.getSelectors<RootState>(
      (state) => state.driverReferences
  );
  
  export default driverReferencesSlice.reducer;