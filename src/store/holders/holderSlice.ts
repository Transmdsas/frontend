import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  EntityAdapter,
} from "@reduxjs/toolkit";
import holdersService from "../../services/holdersService";
import { Holder, HoldersState } from "./types";
import { RootState } from "../index";

export const getHolders = createAsyncThunk("holders/get", async () => {
  const res = await holdersService.getAll();
  return res.data;
});

export const getHolderById = createAsyncThunk(
  "holders/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await holdersService.get(id);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createHolder = createAsyncThunk(
  "holders/create",
  async (data: Holder, { rejectWithValue }) => {
    try {
      const res = await holdersService.create(data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateHolder = createAsyncThunk(
  "holders/update",
  async ({ id, data }: any, { rejectWithValue }) => {
    try {
      const res = await holdersService.update(id, data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteHolder = createAsyncThunk(
  "holders/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await holdersService.delete(id);
      return { id };
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const holdersAdapter: EntityAdapter<Holder> =
  createEntityAdapter<Holder>({
    selectId: (holder) => holder.documentNumber,
    sortComparer: (a, b) => a.documentNumber.localeCompare(b.documentNumber),
  });
export const holderSelectors = holdersAdapter.getSelectors<RootState>(
  (state) => state.holders
);

const initialState = holdersAdapter.getInitialState<HoldersState>({
  isLoading: false,
  error: null,
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
      state.error =
        action.error.message ?? "Ocurrió un error consultando Tenedores";
    });
    builder.addCase(getHolderById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getHolderById.fulfilled, (state, action) => {
      state.isLoading = false;
      holdersAdapter.upsertOne(state, action.payload);
    });
    builder.addCase(getHolderById.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        action.error.message ?? "Ocurrió un error consultando el Tenedor";
    });
    builder.addCase(createHolder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createHolder.fulfilled, (state, action) => {
      state.isLoading = false;
      holdersAdapter.addOne(state, action.payload);
    });
    builder.addCase(createHolder.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        action.error.message ?? "Ocurrió un error guardando el tenedor";
    });
    builder.addCase(updateHolder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateHolder.fulfilled, (state, action) => {
      state.isLoading = false;
      holdersAdapter.upsertOne(state, action.payload);
    });
    builder.addCase(updateHolder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || null;
    });
    builder.addCase(deleteHolder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteHolder.fulfilled, (state, action) => {
      state.isLoading = false;
      holdersAdapter.removeOne(state, action.payload.id);
    });
    builder.addCase(deleteHolder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || null;
    });
  },
});

export const {
  selectAll: selectAllHolders,
  selectById: selectHolderById,
  selectIds: selectHoldersId,
} = holdersAdapter.getSelectors<RootState>((state) => state.holders);

export default holderSlice.reducer;
