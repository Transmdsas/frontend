import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  EntityAdapter,
} from "@reduxjs/toolkit";
import holdersService from "../../services/holdersService";
import { Holder, HoldersState } from './types';
import { RootState } from "../index";

export const getHolders = createAsyncThunk("holders/get", async () => {
  const res = await holdersService.getAll();
  return res.data;
});

export const getHolderById = createAsyncThunk(
  "holders/getById",
  async (id: number) => {
    const res = await holdersService.get(id);
    return res.data;
  }
);

export const createHolder = createAsyncThunk("holders/create", async (data:Holder) => {
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

export const holdersAdapter: EntityAdapter<Holder> = createEntityAdapter<Holder>({
  selectId: (holder) => holder.documentNumber,
  sortComparer: (a, b) => a.documentNumber.localeCompare(b.documentNumber)
});
export const holderSelectors = holdersAdapter.getSelectors<RootState>((state) => state.holders);


const initialState = holdersAdapter.getInitialState<HoldersState>({
  isLoading: false,
  error: null
});

const holderSlice = createSlice({
  name: "holders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHolders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getHolders.fulfilled, (state, action) => {
      state.isLoading = false;
      holdersAdapter.setAll(state, action.payload);
    });
    builder.addCase(getHolders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? 'Ocurrió un error consultando Tenedores';
    })
    builder.addCase(createHolder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createHolder.fulfilled, (state, action) => {
        state.isLoading = false;
        holdersAdapter.addOne(state, action.payload);
    });
    builder.addCase(createHolder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? 'Ocurrió un error guardando el tenedor';
    });
    builder.addCase(updateHolder.fulfilled, (state, action) => {
      holdersAdapter.upsertOne(state, action.payload);
    })
  },
});

export const {
    selectAll: selectAllHolders,
    selectById: selectHolderById,
    selectIds: selectHoldersId
} = holdersAdapter.getSelectors<RootState>((state) => state.holders);


export default holderSlice.reducer;