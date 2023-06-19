import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  EntityAdapter,
} from "@reduxjs/toolkit";
import parametersValuesService from "../../services/parametersValuesService";
import { ParameterValues, ParameterValuesState } from "./types";
import { RootState } from "../index";

export const getparameterValues = createAsyncThunk(
  "parameterValues/get",
  async (parameterValuesId: number) => {
    const res = await parametersValuesService.getListByConfigId(parameterValuesId);
    return res.data;
  }
);

export const getListValue = createAsyncThunk(
  "parameterValues/getById",
  async ({ parametersValueId, id }: any) => {
    const res = await parametersValuesService.getListValues(parametersValueId, id);
    return res.data;
  }
);

export const createListValue = createAsyncThunk(
  "parameterValues/create",
  async (data: ParameterValues) => {
    const res = await parametersValuesService.create(data);
    return res.data;
  }
);

export const updateListValue = createAsyncThunk(
  "parameterValues/update",
  async ({ documentConfigId, id, data }: any) => {
    const res = await parametersValuesService.update(documentConfigId, id, data);
    return res.data;
  }
);

export const deleteListValue = createAsyncThunk(
  "parameterValues/delete",
  async ({ documentConfigId, id }: any) => {
    await parametersValuesService.delete(documentConfigId, id);
    return { id };
  }
);

export const parameterValuesAdapter: EntityAdapter<ParameterValues> =
  createEntityAdapter<ParameterValues>({
    selectId: (parameterValues) => parameterValues.id,
    sortComparer: (a, b) => a.valueName.localeCompare(b.valueName),
  });

export const parameterValuesSelectors = parameterValuesAdapter.getSelectors<RootState>(
  (state) => state.values
);

const initialState = parameterValuesAdapter.getInitialState<ParameterValuesState>({
  isLoading: false,
  error: null,
});

const parameterValuesSlice = createSlice({
  name: "parameterValues",
  initialState,
  reducers: {
    resetparameterValuesState(state) {
      state = parameterValuesAdapter.getInitialState<ParameterValuesState>({
        isLoading: false,
        error: null,
      });
      return state;;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getparameterValues.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getparameterValues.fulfilled, (state, action) => {
      state.isLoading = false;
      parameterValuesAdapter.setAll(state, action.payload);
    });
    builder.addCase(getparameterValues.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        action.error.message ??
        "Ocurrió un error consultando documentos configurados";
    });
    builder.addCase(getListValue.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getListValue.fulfilled, (state, action) => {
      state.isLoading = false;
      parameterValuesAdapter.setOne(state, action.payload);
    });
    builder.addCase(getListValue.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        action.error.message ?? "Ocurrió un error consultando el documento";
    });
    builder.addCase(createListValue.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createListValue.fulfilled, (state, action) => {
      state.isLoading = false;
      parameterValuesAdapter.addOne(state, action.payload);
    });
    builder.addCase(createListValue.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        action.error.message ?? "Ocurrió un error guardando el documento";
    });
    builder.addCase(updateListValue.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateListValue.fulfilled, (state, action) => {
      state.isLoading = false;
      parameterValuesAdapter.upsertOne(state, action.payload);
    });
    builder.addCase(updateListValue.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        action.error.message ?? "Ocurrió un error guardando el documento";
    });
    builder.addCase(deleteListValue.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteListValue.fulfilled, (state, action) => {
      state.isLoading = false;
      parameterValuesAdapter.removeOne(state, action.payload.id);
    });
    builder.addCase(deleteListValue.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        action.error.message ?? "Ocurrió un error eliminando el documento";
    });
  },
});

export const {
  selectAll: selectAllparameterValues,
  selectById: selectParameterValuestById,
  selectIds: selectparameterValuesId,
} = parameterValuesAdapter.getSelectors<RootState>((state) => state.parameterValues);

export const { resetparameterValuesState } = parameterValuesSlice.actions;

export default parameterValuesSlice.reducer;
