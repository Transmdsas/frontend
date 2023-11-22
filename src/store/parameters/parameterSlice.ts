import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  EntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import parameterService from "../../services/parametersService";
import { Parameter, ParametersState } from "./types";
import { RootState } from "../index";

export const getParameters = createAsyncThunk(
  "parameters/get", 
  async () => {
  const res = await parameterService.getAll();
  return res.data;
});

export const getParametersById = createAsyncThunk(
  "parameters/getByid",
  async (id: number) => {
    const res = await parameterService.get(id);
    return res.data;
  }
);

export const createParameters = createAsyncThunk(
  "parameters/create",
  async (parameter: Parameter) => {
    const res = await parameterService.create(parameter);
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
  reducers: {
    resetParametersState(state) {
      state = parametersAdapter.getInitialState<ParametersState>({
        isLoading: false,
        error: null,
      });
      return state;;
    },
    clearCreatedRecordId(state) {
      // state.parameterId = null;
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
        "Ocurrió un error consultando parametros";
    });
    builder.addCase(createParameters.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createParameters.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.createParameter = action.payload.id;
      parametersAdapter.addOne(state, action.payload);
    });
  },
});

export const {
  selectAll: selectAllParameters,
  selectById: selectParametersById,
  selectIds: selectParametersId,
} = parametersAdapter.getSelectors<RootState>((state) => state.parameters);
export const { resetParametersState } = parameterSlice.actions;

export default parameterSlice.reducer;
