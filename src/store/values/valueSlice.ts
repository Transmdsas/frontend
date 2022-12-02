import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import {
  getAll,
  getById,
  create,
  update,
  remove,
  iValue
} from "../../services/valueService";

export const getValues = createAsyncThunk("values/get", async () => {
  const res = await getAll();
  return res;
});


export const getValueById = createAsyncThunk(
    "values/getByid",
    async (id: number) => {
      const res = await getById(id);
      return res;
    }
  );
  
  export const createValue = createAsyncThunk(
    "values/create",
    async (newValue: iValue) => {
      const res = await create(newValue);
      return res;
    }
  );
  
  export const updateValue = createAsyncThunk(
    "values/update",
    async (id: number, data: any) => {
      const res = await update(id, data);
      return res;
    }
  );
  
  export const deleteValue = createAsyncThunk(
    "values/delete",
    async (id: number) => {
      await remove(id);
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
    },
  });

  export const {
    selectById: selectValueById,
    selectAll: selectAllValues
} = valuesAdapter.getSelectors((state:any) => state.parameters);

export default valueSlice.reducer;

