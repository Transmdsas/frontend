import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import departmentService from "../../services/departmentService";
import { Department, DepartmentsState } from "./types";
import { RootState } from "../index";
import { City } from "../cities/types";

export const getDepartments = createAsyncThunk("departments/get", async () => {
  const res = await departmentService.getAll();
  return res.data;
});

export const getDepartmentCities = createAsyncThunk(
  "department/cities",
  async (departmentId: number) => {
    const res = await departmentService.get(departmentId);
    const data = res.data.cities.sort((a: City, b: City) => {
        if (a.description < b.description) {
            return -1;
          }
    });
    return data;
  }
);

export const getDepartmentById = createAsyncThunk(
  "departments/getById",
  async (id: number) => {
    const res = await departmentService.get(id);
    return res.data;
  }
);

export const departmentsAdapter = createEntityAdapter<Department>({
  selectId: (Department) => Department.id,
  sortComparer: (a, b) => a.description.localeCompare(b.description),
});

export const departmentsSelectors = departmentsAdapter.getSelectors<RootState>((state) => state.departments);


const initialState = departmentsAdapter.getInitialState<DepartmentsState>({
    isLoading: false,
    error: null,
    selectedDepartment: null,
    cities: []
});

const departmentSlice = createSlice({
    name: "departmens",
    initialState,
    reducers: {
        selectDepartment: (state, action) => {
            state.selectedDepartment = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getDepartments.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getDepartments.fulfilled, (state, action) => {
            state.isLoading = false;
            departmentsAdapter.setAll(state, action.payload);
        });
        builder.addCase(getDepartments.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message ?? 'Ocurrió un error consultando países';
        });
        builder.addCase(getDepartmentCities.fulfilled, (state, action) => {
            state.cities = action.payload;
        });
    }
});

export const { selectDepartment } = departmentSlice.actions;

export const {
    selectAll: selectAllDepartments,
    selectById: selectDepartmentById
} = departmentsAdapter.getSelectors<RootState>((state) => state.departments);

export default departmentSlice.reducer;