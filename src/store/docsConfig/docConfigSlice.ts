import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  EntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import docsConfigService from "../../services/docsConfigService";
import { DocConfig, DocsConfigState } from "./types";
import { RootState } from "../index";

export const getDocsConfig = createAsyncThunk("docsConfig/get", async () => {
  const res = await docsConfigService.getAll();
  return res.data;
});

export const getDocsConfigById = createAsyncThunk(
  "docsConfig/getById",
  async (id: number) => {
    const res = await docsConfigService.get(id);
    return res.data;
  }
);

export const createDocsConfig = createAsyncThunk(
  "docsConfig/create",
  async (data: DocConfig, { rejectWithValue }) => {
    try{
    const res = await docsConfigService.create(data);
    return res.data;
    } catch(err: any){
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateDocsConfig = createAsyncThunk(
  "docsConfig/update",
  async ({ id, data }: any) => {
    const res = await docsConfigService.update(id, data);
    return res.data;
  }
);

export const deleteDocsConfig = createAsyncThunk(
  "docsConfig/delete",
  async (id : number) => {
    await docsConfigService.delete(id);
    return { id };
  }
);

export const docsConfigAdapter: EntityAdapter<DocConfig> =
  createEntityAdapter<DocConfig>({
    selectId: (docsConfig) => docsConfig.id,
  });

export const docsConfigSelectors = docsConfigAdapter.getSelectors<RootState>(
  (state) => state.docsConfig
);

const initialState = docsConfigAdapter.getInitialState<DocsConfigState>({
  isLoading: false,
  error: null,
  createdRecordId: null,
});

const docsConfigSlice = createSlice({
  name: "docsConfig",
  initialState,
  reducers: {
    clearCreatedRecordId(state) {
      state.createdRecordId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDocsConfig.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getDocsConfig.fulfilled, (state, action) => {
      state.isLoading = false;
      docsConfigAdapter.setAll(state, action.payload);
    });
    builder.addCase(getDocsConfig.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        action.error.message ??
        "Ocurrió un error consultando configuraciones de carga";
    });
    builder.addCase(createDocsConfig.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createDocsConfig.fulfilled, (state, action) => {
      state.isLoading = false;
      state.createdRecordId = action.payload.id;
      docsConfigAdapter.addOne(state, action.payload);
    });
    builder.addCase(createDocsConfig.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        action.error.message ?? "Ocurrió un error guardando la configuración de carga";
    });
    builder.addCase(getDocsConfigById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getDocsConfigById.fulfilled, (state, action) => {
      state.isLoading = false;
      docsConfigAdapter.upsertOne(state, action.payload);
    });
    builder.addCase(getDocsConfigById.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        action.error.message ??
        "Ocurrió un error consultando la configuración de carga";
    });
    builder.addCase(updateDocsConfig.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateDocsConfig.fulfilled, (state, action) => {
      state.isLoading = false;
      docsConfigAdapter.upsertOne(state, action.payload);
    });
    builder.addCase(updateDocsConfig.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        action.error.message ?? "Ocurrió un error guardando la configuración de carga";
    });
    builder.addCase(deleteDocsConfig.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteDocsConfig.fulfilled, (state, action) => {
      state.isLoading = false;
      docsConfigAdapter.removeOne(state, action.payload.id);
    });
    builder.addCase(deleteDocsConfig.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || null;
    });
  },
});

export const {
  selectAll: selectAllDocsConfig,
  selectById: selectDocConfigById,
  selectIds: selectDocsConfigId,
} = docsConfigAdapter.getSelectors<RootState>((state) => state.docsConfig);

export const selectDocConfigByTypeAndRefCode = createSelector(
  [selectAllDocsConfig, (_state: RootState, typeId: number, refCode?: number) => ({ typeId, refCode })],
  (docsConfigs, { typeId, refCode }) => {
    return docsConfigs.find((config) => {
      return config.configTypeId === typeId && (!refCode || config.referenceCodeId === refCode);
    });
  }
);


export const { clearCreatedRecordId } = docsConfigSlice.actions;

export default docsConfigSlice.reducer;
