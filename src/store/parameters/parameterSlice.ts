import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { parameterService } from "../../services/parametersService";

export const getParameters = createAsyncThunk("parameters/get", async () => {
  const res = await parameterService.getParameters();
  return res;
});

export const getParametersById = createAsyncThunk(
  "parameters/getByid",
  async (id: number) => {
    // const res = await parameterService.getParameterById(id);
    // return res;
  }
);

export const createParameter = createAsyncThunk(
  "parameters/create",
  async (parameter: string) => {
    const res = await parameterService.createParameter(parameter);
    return res;
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

export const parametersAdapter = createEntityAdapter();

const initialState: any = parametersAdapter.getInitialState();

const parameterSlice = createSlice({
  name: "parameters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getParameters.fulfilled, parametersAdapter.upsertMany);
    builder.addCase(getParametersById.fulfilled, parametersAdapter.upsertOne);
    builder.addCase(createParameter.fulfilled, (state, { payload }) => {
      parametersAdapter.upsertOne(state, payload);
    });
  },
});

export const { selectById: selectParamById, selectAll: selectAllParams } =
  parametersAdapter.getSelectors((state: any) => state.parameters);

export default parameterSlice.reducer;
