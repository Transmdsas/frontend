import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  EntityAdapter,
} from "@reduxjs/toolkit";
import holderDocumentService from "../../services/holderDocumentService";
import { HolderDocument, HoldersState } from "./types";
import { RootState } from "../index";

export const getHolderDocuments = createAsyncThunk(
  "holderDocuments/get",
  async (holderId: string) => {
    const res = await holderDocumentService.getDocumentsByHolderId(holderId);
    return res.data;
  }
);

export const getHolderDocument = createAsyncThunk(
    "holderDocuments/getById",
    async ({ holderId, id }: any) => {
        const res = await holderDocumentService.getHolderDocument(holderId, id);
        return res.data;
    }
);

export const createHolderDocument = createAsyncThunk(
    "holderDocuments/create",
    async (data: HolderDocument) => {
        const res = await holderDocumentService.create(data);
        return res.data;
    }
);

export const updateHolderDocument = createAsyncThunk(
    "holderDocuments/update",
    async ({ holderId, id, data }: any) => {
        const res = await holderDocumentService.update(holderId, id, data);
        return res.data;
    }
);

export const deleteHolderDocument = createAsyncThunk(
    "holderDocuments/delete",
    async ({ holderId, id }: any) => {
        await holderDocumentService.delete(holderId, id);
        return { id };
    }   
);

export const holderDocumentsAdapter: EntityAdapter<HolderDocument> = createEntityAdapter<HolderDocument>({
    selectId: (holderDocument) => holderDocument.id,
    //sortComparer: (a, b) => a.holderId.localeCompare(b.documentName)
});

export const holderDocumentsSelectors = holderDocumentsAdapter.getSelectors<RootState>(
    (state) => state.holderDocuments
);

const initialState = holderDocumentsAdapter.getInitialState<HoldersState>({
    isLoading: false,
    error: null,
});

const holderDocumentsSlice = createSlice({
    name: "holderDocuments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getHolderDocuments.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getHolderDocuments.fulfilled, (state, action) => {
            state.isLoading = false;
            holderDocumentsAdapter.setAll(state, action.payload);
        });
        builder.addCase(getHolderDocuments.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getHolderDocument.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getHolderDocument.fulfilled, (state, action) => {
            state.isLoading = false;
            holderDocumentsAdapter.setOne(state, action.payload);
        });
        builder.addCase(getHolderDocument.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(createHolderDocument.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createHolderDocument.fulfilled, (state, action) => {
            state.isLoading = false;
            holderDocumentsAdapter.addOne(state, action.payload);
        });
        builder.addCase(createHolderDocument.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(updateHolderDocument.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateHolderDocument.fulfilled, (state, action) => {
            state.isLoading = false;
            holderDocumentsAdapter.upsertOne(state, action.payload);
        });
        builder.addCase(updateHolderDocument.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(deleteHolderDocument.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteHolderDocument.fulfilled, (state, action) => {
            state.isLoading = false;
            holderDocumentsAdapter.removeOne(state, action.payload.id);
        });
        builder.addCase(deleteHolderDocument.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || null;
        });
    }
});

export const {
    selectAll: selectAllHolderDocuments,
    selectById: selectHolderDocumentById,
    selectIds: selectHolderDocumentIds,
} = holderDocumentsAdapter.getSelectors<RootState>((state) => state.holderDocuments);

export default holderDocumentsSlice.reducer;




