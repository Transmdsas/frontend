import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  EntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import parametersService from "../../services/parametersService";
import { Parameter, ParameterState } from "./types";
import { RootState } from "../index";

export const getParameters = createAsyncThunk("parameter/get", async () => {
  const res = await parametersService.getAll();
  return res.data;
});

export const getParametersById = createAsyncThunk(
  "parameter/getById",
  async (id: number) => {
    const res = await parametersService.get(id);
    return res.data;
  }
);

export const createParameter = createAsyncThunk(
  "parameter/create",
  async (data: Parameter) => {
    const res = await parametersService.create(data);
    return res.data;
  }
);

export const updateParameter = createAsyncThunk(
  "parameter/update",
  async ({ id, data }: any) => {
    const res = await parametersService.update(id, data);
    return res.data;
  }
);

export const deleteParameter = createAsyncThunk(
  "parameter/delete",
  async ({ id }: any) => {
    await parametersService.delete(id);
    return { id };
  }
);

export const parametersAdapter: EntityAdapter<Parameter> =
  createEntityAdapter<Parameter>({
    selectId: (parameter) => parameter.id,
  });

export const parameterSelectors = parametersAdapter.getSelectors<RootState>(
  (state) => state.parameters
);

const initialState = parametersAdapter.getInitialState<ParameterState>({
  isLoading: false,
  error: null,
  createdRecordId: null,
});

const parameterSlice = createSlice({
  name: "parameters",
  initialState,
  reducers: {
    clearCreatedRecordId(state) {
      state.createdRecordId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getParameters.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getParameters.fulfilled, (state, action) => {
      state.isLoading = false;
      parametersAdapter.setAll(state, action.payload);
    });
    builder.addCase(getParameters.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        action.error.message ??
        "Ocurrió un error consultando configuraciones de carga";
    });
    builder.addCase(createParameter.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createParameter.fulfilled, (state, action) => {
      state.isLoading = false;
      state.createdRecordId = action.payload.id;
      parametersAdapter.addOne(state, action.payload);
    });
    builder.addCase(createParameter.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        action.error.message ?? "Ocurrió un error guardando la configuración de carga";
    });
    builder.addCase(getParametersById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getParametersById.fulfilled, (state, action) => {
      state.isLoading = false;
      parametersAdapter.upsertOne(state, action.payload);
    });
    builder.addCase(getParametersById.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        action.error.message ??
        "Ocurrió un error consultando la configuración de carga";
    });
    builder.addCase(updateParameter.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateParameter.fulfilled, (state, action) => {
      state.isLoading = false;
      parametersAdapter.upsertOne(state, action.payload);
    });
    builder.addCase(updateParameter.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        action.error.message ?? "Ocurrió un error guardando la configuración de carga";
    });
  },
});

export const {
  selectAll: selectAllParameters,
  selectById: selectParametersById,
  selectIds: selectParametersId,
} = parametersAdapter.getSelectors<RootState>((state) => state.parameters);


export const selectDocConfigByTypeAndRefCode = createSelector(
  [selectAllParameters, (_state: RootState, typeId: number, refCode?: number) => ({ typeId, refCode })],
  (parameters, { typeId, refCode }) => {
    return parameters.find((config) => {
      return config.parameterTypeId === typeId && (!refCode || config.referenceCodeId === refCode);
    });
  }
);

export const { clearCreatedRecordId } = parameterSlice.actions;

export default parameterSlice.reducer;
