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
  async (id: number) => {
    const res = await ownersService.get(id);
    return res.data;
  }
);

export const createOwner = createAsyncThunk(
  "owners/create",
  async (data: Owner) => {
    const res = await ownersService.create(data);
    return res.data;
  }
);

export const updateOwner = createAsyncThunk(
  "owners/update",
  async ({ id, data }: any) => {
    const res = await ownersService.update(id, data);
    return res.data;
  }
);

export const deleteHolder = createAsyncThunk(
  "owners/delete",
  async ({ id }: any) => {
    await ownersService.delete(id);
    return { id };
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
      state.error = action.error.message ?? "Ocurrió un error guardando el propietario";
    });
  },
});

export const {
    selectAll: selectAllOwners,
    selectById: selectOwnerById,
    selectIds: selectOwnersId
} = ownersAdapter.getSelectors<RootState>((state) => state.owners);

export default ownerSlice.reducer;
