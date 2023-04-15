import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import ValueService from "../../services/valueService";
import { Value } from './types';
//import { RootState } from "../index";

export const getValues = createAsyncThunk("values/get", async () => {
  const res = await ValueService.getAll();
  return res;
});


export const getValueById = createAsyncThunk(
    "values/getByid",
    async (id: number) => {
      //const res = await getById(id);
      //return res;
    }
  );
  
  export const createValues = createAsyncThunk(
    "values/create",
    async (newValues: Value[]) => {
     // const res = await create(newValues);
      //return res;
    }
  );
  
  export const updateValue = createAsyncThunk(
    "values/update",
    async (id: number, data: any) => {
      //const res = await update(id, data);
      //return res;
    }
  );
  
  export const deleteValue = createAsyncThunk(
    "values/delete",
    async (id: number) => {
     // await remove(id);
      return id;
    }
  );
  
  export const valuesAdapter = createEntityAdapter();

  const initialState: any = valuesAdapter.getInitialState();


  const valueSlice = createSlice({
    name: 'values',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getValues.fulfilled, valuesAdapter.upsertMany);
        builder.addCase(getValueById.fulfilled, valuesAdapter.upsertOne);
        // builder.addCase(createValues.fulfilled, (state, {payload}) => {
        //   valuesAdapter.addMany(state, payload);
        // })
    },
  });

  export const {
    selectById: selectValueById,
    selectAll: selectAllValues
} = valuesAdapter.getSelectors((state:any) => state.values);

export default valueSlice.reducer;

