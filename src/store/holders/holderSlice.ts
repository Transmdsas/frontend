import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import holdersService from "../../services/holdersService";

interface Holder {
  documentNumber: string,
  documentTypeId: number,
  firstName: string,
  lastName: string,
  birthDate: Date,
  cellphone: string,
  email: string, 
  bankCertification: string,
  bankId: number,
  address: string,
  cityId: number,
  rut: string,
  hasActivityRut: string,
  balances: boolean,
  advances: boolean,
  createdAt: Date,
  updatedAt: Date
};


export const getHolders = createAsyncThunk("holders/get", async () => {
  const res = await holdersService.getAll();
  console.log("res from holders", res);
  return res.data;
});

export const getHolderById = createAsyncThunk(
  "holders/getById",
  async (id: number) => {
    const res = await holdersService.get(id);
    return res.data;
  }
);

export const createHolder = createAsyncThunk("holders/create", async (data) => {
  const res = await holdersService.create(data);
  return res.data;
});

export const updateHolder = createAsyncThunk(
  "holders/update",
  async ({ id, data }: any) => {
    const res = await holdersService.update(id, data);
    return res.data;
  }
);

export const deleteHolder = createAsyncThunk(
  "holders/delete",
  async ({ id }: any) => {
    await holdersService.delete(id);
    return { id };
  }
);

export const holdersAdapter = createEntityAdapter<Holder>({
  selectId: (holder) => holder.documentNumber,
  sortComparer: (a, b) => a.documentNumber.localeCompare(b.documentNumber)
});

const initialState: any = holdersAdapter.getInitialState();

const holderSlice = createSlice({
  name: "holders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHolders.fulfilled, holdersAdapter.upsertMany);
    builder.addCase(getHolderById.fulfilled, holdersAdapter.upsertOne);
    builder.addCase(createHolder.fulfilled, (state, { payload }) => {
        holdersAdapter.addOne(state, payload);
    });
  },
});

export const {
    selectById: selectHolderById,
    selectAll: selectAllHolders
} = holdersAdapter.getSelectors((state:any) => state.holders);

export default holderSlice.reducer;