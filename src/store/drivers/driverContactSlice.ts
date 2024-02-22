import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  EntityAdapter,
} from "@reduxjs/toolkit";
import contactsService from "../../services/driverContactsService";
import { DriverContact, DriversState } from "./types";
import { RootState } from "..";

interface MyKnownError {
  message: string;
}

export const getDriverContacts = createAsyncThunk(
  "driverContacts/get",
  async (driverId: string, { rejectWithValue }) => {
    try {
      const res = await contactsService.getDriverContacts(driverId);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getContact = createAsyncThunk(
  "driverContacts/getById",
  async ({ driverId, contactId }: any, { rejectWithValue }) => {
    try {
      const res = await contactsService.getContact(driverId, contactId);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createContact = createAsyncThunk<
  DriverContact,
  DriverContact,
  {
    rejectValue: MyKnownError;
  }
>("driverContacts/create", async (data, thunkApi) => {
  try {
    const res = await contactsService.createContact(data);
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data as MyKnownError);
  }
});

export const updateContact = createAsyncThunk(
  "driverContacts/update",
  async ({ driverId, contactId, data }: any, {rejectWithValue}) => {
    try{
    const res = await contactsService.updateContact(driverId, contactId, data);
    return res.data;
    }catch(err: any){
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "driverContacts/delete",
  async ({ driverId, contactId }: any, {rejectWithValue}) => {
    try {
      await contactsService.deleteContact(driverId, contactId);
      return { contactId };
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const driverContactsAdapter: EntityAdapter<DriverContact> =
  createEntityAdapter<DriverContact>({
    selectId: (driverContact) => driverContact.id,
    sortComparer: (a, b) => a.fullName.localeCompare(b.fullName),
  });

export const driverContactsSelectors =
  driverContactsAdapter.getSelectors<RootState>(
    (state) => state.driverContacts
  );

const initialState = driverContactsAdapter.getInitialState<DriversState>({
  isLoading: false,
  error: null,
});

const driverContactsSlice = createSlice({
  name: "driverContacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDriverContacts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getDriverContacts.fulfilled, (state, action) => {
      state.isLoading = false;
      driverContactsAdapter.setAll(state, action.payload);
    });
    builder.addCase(getDriverContacts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || null;
    });
    builder.addCase(getContact.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getContact.fulfilled, (state, action) => {
      state.isLoading = false;
      driverContactsAdapter.setOne(state, action.payload);
    });
    builder.addCase(getContact.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || null;
    });
    builder.addCase(createContact.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createContact.fulfilled, (state, action) => {
      state.isLoading = false;
      driverContactsAdapter.addOne(state, action.payload);
    });
    builder.addCase(createContact.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message || null;
      }
    });
    builder.addCase(updateContact.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateContact.fulfilled, (state, action) => {
      state.isLoading = false;
      driverContactsAdapter.upsertOne(state, action.payload);
    });
    builder.addCase(updateContact.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || null;
    });
    builder.addCase(deleteContact.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteContact.fulfilled, (state, action) => {
      state.isLoading = false;
      driverContactsAdapter.removeOne(state, action.payload.contactId);
    });
    builder.addCase(deleteContact.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || null;
    });
  },
});

export const {
  selectAll: selectAllDriverContacts,
  selectById: selectDriverContactsById,
  selectIds: selectDriverContactIds,
} = driverContactsAdapter.getSelectors<RootState>(
  (state) => state.driverContacts
);

export default driverContactsSlice.reducer;
