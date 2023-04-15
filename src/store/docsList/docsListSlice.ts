import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  EntityAdapter,
} from "@reduxjs/toolkit";
import docsListService from "../../services/docsListService";
import { DocList, DocsListState } from "./types";
import { RootState } from "../index";

export const getDocsList = createAsyncThunk(
  "docsList/get",
  async (documentConfigId: number) => {
    const res = await docsListService.getListByConfigId(documentConfigId);
    return res.data;
  }
);

export const getListItem = createAsyncThunk(
  "docsList/getById",
  async ({ documentConfigId, id }: any) => {
    const res = await docsListService.getListItem(documentConfigId, id);
    return res.data;
  }
);

export const createDocListItem = createAsyncThunk(
  "docsList/create",
  async (data: DocList) => {
    const res = await docsListService.create(data);
    return res.data;
  }
);

export const updateDocListItem = createAsyncThunk(
  "docsList/update",
  async ({ documentConfigId, id, data }: any) => {
    const res = await docsListService.update(documentConfigId, id, data);
    return res.data;
  }
);

export const deleteDocListItem = createAsyncThunk(
  "docsList/delete",
  async ({ documentConfigId, id }: any) => {
    await docsListService.delete(documentConfigId, id);
    return { id };
  }
);

export const docsListAdapter: EntityAdapter<DocList> =
  createEntityAdapter<DocList>({
    selectId: (docsList) => docsList.id,
    sortComparer: (a, b) => a.documentName.localeCompare(b.documentName),
  });

export const docsListSelectors = docsListAdapter.getSelectors<RootState>(
  (state) => state.docsList
);

const initialState = docsListAdapter.getInitialState<DocsListState>({
  isLoading: false,
  error: null,
});

const docsListSlice = createSlice({
  name: "docsList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDocsList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getDocsList.fulfilled, (state, action) => {
      state.isLoading = false;
      docsListAdapter.setAll(state, action.payload);
    });
    builder.addCase(getDocsList.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        action.error.message ??
        "Ocurrió un error consultando documentos configurados";
    });
    builder.addCase(getListItem.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getListItem.fulfilled, (state, action) => {
      state.isLoading = false;
      docsListAdapter.setOne(state, action.payload);
    });
    builder.addCase(getListItem.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        action.error.message ?? "Ocurrió un error consultando el documento";
    });
    builder.addCase(createDocListItem.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createDocListItem.fulfilled, (state, action) => {
      state.isLoading = false;
      docsListAdapter.addOne(state, action.payload);
    });
    builder.addCase(createDocListItem.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        action.error.message ?? "Ocurrió un error guardando el tenedor";
    });
    builder.addCase(updateDocListItem.fulfilled, (state, action) => {
      docsListAdapter.upsertOne(state, action.payload);
    });
  },
});

export const {
  selectAll: selectAllDocsList,
  selectById: selectDocListById,
  selectIds: selectDocsListId,
} = docsListAdapter.getSelectors<RootState>((state) => state.docsList);

export default docsListSlice.reducer;
