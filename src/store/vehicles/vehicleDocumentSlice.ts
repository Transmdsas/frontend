import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
    EntityAdapter,
  } from "@reduxjs/toolkit";
  import vehicleDocumentService from "../../services/vehicleDocumentService";
  import { VehicleDocument, VehiclesState } from "./types";
  import { RootState } from "..";
  
  export const getVehicleDocuments = createAsyncThunk(
    "vehicleDocuments/get",
    async (carPlate: string) => {
      const res = await vehicleDocumentService.getDocumentsByCarPlate(carPlate);
      return res.data;
    }
  );
  
  export const getVehicleDocument = createAsyncThunk(
    "vehicleDocuments/getById",
    async ({ carPlate, id }: any) => {
      const res = await vehicleDocumentService.getVehicleDocument(carPlate, id);
      return res.data;
    }
  );
  
  export const createVehicleDocument = createAsyncThunk(
    "vehicleDocuments/create",
    async (data: VehicleDocument) => {
      const res = await vehicleDocumentService.create(data);
      return res.data;
    }
  );
  
  export const updateVehicleDocument = createAsyncThunk(
    "vehicleDocuments/update",
    async ({ carPlate, id, data }: any) => {
      const res = await vehicleDocumentService.update(carPlate, id, data);
      return res.data;
    }
  );
  
  export const deleteVehicleDocument = createAsyncThunk(
    "vehicleDocuments/delete",
    async ({ carPlate, id }: any) => {
      await vehicleDocumentService.delete(carPlate, id);
      return { id };
    }
  );
  
  export const vehicleDocumentsAdapter: EntityAdapter<VehicleDocument> =
    createEntityAdapter<VehicleDocument>({
      selectId: (vehicleDocument) => vehicleDocument.id,
    });
  
  export const vehicleDocumentsSelectors =
    vehicleDocumentsAdapter.getSelectors<RootState>(
      (state) => state.vehicleDocuments
    );
  
  const initialState = vehicleDocumentsAdapter.getInitialState<VehiclesState>({
    isLoading: false,
    error: null,
  });
  
  const vehicleDocumentsSlice = createSlice({
    name: "vehicleDocuments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getVehicleDocuments.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(getVehicleDocuments.fulfilled, (state, action) => {
        state.isLoading = false;
        vehicleDocumentsAdapter.setAll(state, action.payload);
      });
      builder.addCase(getVehicleDocuments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
      builder.addCase(getVehicleDocument.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(getVehicleDocument.fulfilled, (state, action) => {
        state.isLoading = false;
        vehicleDocumentsAdapter.setOne(state, action.payload);
      });
      builder.addCase(getVehicleDocument.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
      builder.addCase(createVehicleDocument.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(createVehicleDocument.fulfilled, (state, action) => {
        state.isLoading = false;
        vehicleDocumentsAdapter.addOne(state, action.payload);
      });
      builder.addCase(createVehicleDocument.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
      builder.addCase(updateVehicleDocument.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(updateVehicleDocument.fulfilled, (state, action) => {
        state.isLoading = false;
        vehicleDocumentsAdapter.upsertOne(state, action.payload);
      });
      builder.addCase(updateVehicleDocument.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
      builder.addCase(deleteVehicleDocument.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(deleteVehicleDocument.fulfilled, (state, action) => {
        state.isLoading = false;
        vehicleDocumentsAdapter.removeOne(state, action.payload.id);
      });
      builder.addCase(deleteVehicleDocument.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
    },
  });
  
  export const {
      selectAll: selectAllVehicleDocuments,
      selectById: selectVehicleDocumentById,
      selectIds: selectVehicleDocumentIds,
    } = vehicleDocumentsAdapter.getSelectors<RootState>(
      (state) => state.vehicleDocuments
    );
    
    export default vehicleDocumentsSlice.reducer;
    