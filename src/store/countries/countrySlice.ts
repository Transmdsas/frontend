import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import countryService from "../../services/countryService";
import { Country, CountriesState } from "./types";
import { RootState } from "../index";

export const getCountries = createAsyncThunk("countries/get", async () => {
  const res = await countryService.getAll();
  return res.data;
});

export const getCountryById = createAsyncThunk(
  "holders/getById",
  async (id: number) => {
    const res = await countryService.get(id);
    return res.data;
  }
);

export const countriesAdapter = createEntityAdapter<Country>({
    selectId: (Country) => Country.id, 
    sortComparer: (a, b) => a.description.localeCompare(b.description)
});

export const countriesSelectors = countriesAdapter.getSelectors<RootState>((state) => state.countries);

const initialState = countriesAdapter.getInitialState<CountriesState>({
    isLoading: false,
    error: null
});

const countrySlice = createSlice({
    name: "countries",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCountries.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getCountries.fulfilled, (state, action) => {
            state.isLoading = false;
            countriesAdapter.setAll(state, action.payload);
        });
        builder.addCase(getCountries.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message ?? 'Ocurrió un error consultando países';
        });

    }
});

export const {
    selectAll: selectAllCountries,
    selectById: selectCountryById
} = countriesAdapter.getSelectors<RootState>((state) => state.countries);

export default countrySlice.reducer;