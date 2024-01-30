import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import ownersService from "../../services/ownersService";
import { Owner, OwnersState } from "./types";
import { RootState } from "../index";

export const getOwners = createAsyncThunk("owners/get", async () => {
  const res = await ownersService.getAll();
  return res.data;
});

export const getOwnerById = createAsyncThunk(
  "owners/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await ownersService.get(id);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createOwner = createAsyncThunk(
  "owners/create",
  async (data: Owner, { rejectWithValue }) => {
    try {
      const res = await ownersService.create(data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateOwner = createAsyncThunk(
  "owners/update",
  async ({ id, data }: any, {rejectWithValue}) => {
    try {
      const res = await ownersService.update(id, data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteOwner = createAsyncThunk(
  "owners/delete",
  async (id: string , {rejectWithValue}) => {
    try{
    await ownersService.delete(id);
    return { id };
    }catch(err: any){
      return rejectWithValue(err.response.data);
    }
  }
);

export const ownersAdapter = createEntityAdapter<Owner>({
  selectId: (owner) => owner.documentNumber,
  sortComparer: (a, b) => a.documentNumber.localeCompare(b.documentNumber),
});
export const ownerSelectors = ownersAdapter.getSelectors<RootState>(
  (state) => state.owners
);

const initialState = ownersAdapter.getInitialState<OwnersState>({
  isLoading: false,
  error: null,
});

const ownerSlice = createSlice({
  name: "owners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOwners.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOwners.fulfilled, (state, action) => {
      state.isLoading = false;
      ownersAdapter.setAll(state, action.payload);
    });
    builder.addCase(getOwners.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        action.error.message ?? "Ocurrió un error consultando propietarios";
    });
    builder.addCase(createOwner.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createOwner.fulfilled, (state, action) => {
      state.isLoading = false;
      ownersAdapter.addOne(state, action.payload);
    });
    builder.addCase(createOwner.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        action.error.message ?? "Ocurrió un error guardando el propietario";
    });
    builder.addCase(updateOwner.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateOwner.fulfilled, (state, action) => {
      state.isLoading = false;
      ownersAdapter.upsertOne(state, action.payload);
    });
    builder.addCase(updateOwner.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || null;
    });
    builder.addCase(deleteOwner.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteOwner.fulfilled, (state, action) => {
      state.isLoading = false;
      ownersAdapter.removeOne(state, action.payload.id);
    });
    builder.addCase(deleteOwner.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || null;
    });
  },
});

export const {
  selectAll: selectAllOwners,
  selectById: selectOwnerById,
  selectIds: selectOwnersId,
} = ownersAdapter.getSelectors<RootState>((state) => state.owners);

export default ownerSlice.reducer;
