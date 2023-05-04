import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  EntityAdapter,
} from "@reduxjs/toolkit";
import ownerDocumentService from "../../services/ownerDocumentService";
import { OwnerDocument, OwnersState } from "./types";
import { RootState } from "..";

export const getOwnerDocuments = createAsyncThunk(
  "ownerDocuments/get",
  async (ownerId: string) => {
    const res = await ownerDocumentService.getDocumentsByOwnerId(ownerId);
    return res.data;
  }
);

export const getOwnerDocument = createAsyncThunk(
  "ownerDocuments/getById",
  async ({ ownerId, id }: any) => {
    const res = await ownerDocumentService.getOwnerDocument(ownerId, id);
    return res.data;
  }
);

export const createOwnerDocument = createAsyncThunk(
  "ownerDocuments/create",
  async (data: OwnerDocument) => {
    const res = await ownerDocumentService.create(data);
    return res.data;
  }
);

export const updateOwnerDocument = createAsyncThunk(
  "ownerDocuments/update",
  async ({ ownerId, id, data }: any) => {
    const res = await ownerDocumentService.update(ownerId, id, data);
    return res.data;
  }
);

export const deleteOwnerDocument = createAsyncThunk(
  "ownerDocuments/delete",
  async ({ ownerId, id }: any) => {
    await ownerDocumentService.delete(ownerId, id);
    return { id };
  }
);

export const ownerDocumentsAdapter: EntityAdapter<OwnerDocument> =
  createEntityAdapter<OwnerDocument>({
    selectId: (ownerDocument) => ownerDocument.id,
  });

export const ownerDocumentsSelectors =
  ownerDocumentsAdapter.getSelectors<RootState>(
    (state) => state.ownerDocuments
  );

const initialState = ownerDocumentsAdapter.getInitialState<OwnersState>({
  isLoading: false,
  error: null,
});

const ownerDocumentsSlice = createSlice({
  name: "ownerDocuments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOwnerDocuments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOwnerDocuments.fulfilled, (state, action) => {
      state.isLoading = false;
      ownerDocumentsAdapter.setAll(state, action.payload);
    });
    builder.addCase(getOwnerDocuments.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || null;
    });
    builder.addCase(getOwnerDocument.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOwnerDocument.fulfilled, (state, action) => {
      state.isLoading = false;
      ownerDocumentsAdapter.setOne(state, action.payload);
    });
    builder.addCase(getOwnerDocument.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || null;
    });
    builder.addCase(createOwnerDocument.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createOwnerDocument.fulfilled, (state, action) => {
      state.isLoading = false;
      ownerDocumentsAdapter.addOne(state, action.payload);
    });
    builder.addCase(createOwnerDocument.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || null;
    });
    builder.addCase(updateOwnerDocument.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateOwnerDocument.fulfilled, (state, action) => {
      state.isLoading = false;
      ownerDocumentsAdapter.upsertOne(state, action.payload);
    });
    builder.addCase(updateOwnerDocument.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || null;
    });
    builder.addCase(deleteOwnerDocument.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteOwnerDocument.fulfilled, (state, action) => {
      state.isLoading = false;
      ownerDocumentsAdapter.removeOne(state, action.payload.id);
    });
    builder.addCase(deleteOwnerDocument.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || null;
    });
  },
});

export const {
    selectAll: selectAllOwnerDocuments,
    selectById: selectOwnerDocumentById,
    selectIds: selectOwnerDocumentIds,
  } = ownerDocumentsAdapter.getSelectors<RootState>(
    (state) => state.ownerDocuments
  );
  
  export default ownerDocumentsSlice.reducer;
  