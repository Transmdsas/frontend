import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  EntityAdapter,
} from "@reduxjs/toolkit";
import driverDocumentService from "../../services/driverDocumentService";
import { DriverDocument, DriversState } from "./types";
import { RootState } from "..";

export const getDriverDocuments = createAsyncThunk(
  "driverDocuments/get",
  async (driverId: string) => {
    const res = await driverDocumentService.getDocumentsByDriverId(driverId);
    return res.data;
  }
);

export const getDriverDocument = createAsyncThunk(
  "driverDocuments/getById",
  async ({ driverId, id }: any) => {
    const res = await driverDocumentService.getDriverDocument(driverId, id);
    return res.data;
  }
);

export const createDriverDocument = createAsyncThunk(
  "driverDocuments/create",
  async (data: DriverDocument) => {
    const res = await driverDocumentService.create(data);
    return res.data;
  }
);

export const updateDriverDocument = createAsyncThunk(
  "driverDocuments/update",
  async ({ driverId, id, data }: any) => {
    const res = await driverDocumentService.update(driverId, id, data);
    return res.data;
  }
);

export const deleteDriverDocument = createAsyncThunk(
  "driverDocuments/delete",
  async ({ driverId, id }: any) => {
    await driverDocumentService.delete(driverId, id);
    return { id };
  }
);

export const driverDocumentsAdapter: EntityAdapter<DriverDocument> =
  createEntityAdapter<DriverDocument>({
    selectId: (driverDocument) => driverDocument.id,
  });

export const driverDocumentsSelectors =
  driverDocumentsAdapter.getSelectors<RootState>(
    (state) => state.driverDocuments
  );

const initialState = driverDocumentsAdapter.getInitialState<DriversState>({
  isLoading: false,
  error: null,
});

const driverDocumentsSlice = createSlice({
  name: "driverDocuments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDriverDocuments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getDriverDocuments.fulfilled, (state, action) => {
      state.isLoading = false;
      driverDocumentsAdapter.setAll(state, action.payload);
    });
    builder.addCase(getDriverDocuments.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || null;
    });
    builder.addCase(getDriverDocument.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getDriverDocument.fulfilled, (state, action) => {
      state.isLoading = false;
      driverDocumentsAdapter.setOne(state, action.payload);
    });
    builder.addCase(getDriverDocument.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || null;
    });
    builder.addCase(createDriverDocument.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createDriverDocument.fulfilled, (state, action) => {
      state.isLoading = false;
      driverDocumentsAdapter.addOne(state, action.payload);
    });
    builder.addCase(createDriverDocument.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || null;
    });
    builder.addCase(updateDriverDocument.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateDriverDocument.fulfilled, (state, action) => {
      state.isLoading = false;
      driverDocumentsAdapter.upsertOne(state, action.payload);
    });
    builder.addCase(updateDriverDocument.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || null;
    });
    builder.addCase(deleteDriverDocument.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteDriverDocument.fulfilled, (state, action) => {
      state.isLoading = false;
      driverDocumentsAdapter.removeOne(state, action.payload.id);
    });
    builder.addCase(deleteDriverDocument.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || null;
    });
  },
});

export const {
  selectAll: selectAllDriverDocuments,
  selectById: selectDriverDocumentById,
  selectIds: selectDriverDocumentIds,
} = driverDocumentsAdapter.getSelectors<RootState>(
  (state) => state.driverDocuments
);

export default driverDocumentsSlice.reducer;
