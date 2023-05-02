import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  EntityAdapter,
} from "@reduxjs/toolkit";
import ParameterService from "../../services/parametersService";
import { Parameter, ParametersState } from "./types";
import { RootState } from "../index";
import { error } from "console";

export const getParameters = createAsyncThunk("parameters/get", async () => {
  const res = await ParameterService.getAll();
  return res.data;
});

export const getParametersById = createAsyncThunk(
  "parameters/getByid",
  async (id: number) => {
    const res = await ParameterService.get(id);
    return res.data;
  }
);

export const createParameter = createAsyncThunk(
  "parameters/create",
  async (parameter: Parameter) => {
    const res = await ParameterService.create(parameter);
    return res.data;
  }
);

export const updateParameter = createAsyncThunk(
  "parameters/update",
  async (id: number, data: any) => {
    // const res = await parameterService.updateParameter(id, data);
    // return res;
  }
);

export const deleteParameter = createAsyncThunk(
  "parameters/delete",
  async (id: number) => {
    //await parameterService.deleteParameter(id);
    return id;
  }
);

export const parametersAdapter: EntityAdapter<Parameter> = createEntityAdapter<Parameter>({
  selectId: (parameter) => parameter.id
});

export const parameterSelectors = parametersAdapter.getSelectors<RootState>(
  (state) => state.parameters
);

const initialState = parametersAdapter.getInitialState<ParametersState>({
  isLoading: false,
  error: null
});

const parameterSlice = createSlice({
  name: "parameters",
  initialState,
  reducers: {},
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
      state.error = action.error.message ?? "Ocurrió un error consultando parametros";
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
      state.error = action.error.message ?? "Ocurrió un error obteniendo el parametro";
    });
    builder.addCase(createParameter.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createParameter.fulfilled, (state, action) => {
      state.isLoading = false;
      parametersAdapter.addOne(state, action.payload);
    });
    builder.addCase(createParameter.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Ocurrió un error creando el parametro";
    });
  },
});

export const { 
  selectAll: selectAllParams,
  selectById: selectParamById, 
  selectIds: selectParametersId,
} =  parametersAdapter.getSelectors<RootState>((state) => state.parameters);


export default parameterSlice.reducer;
