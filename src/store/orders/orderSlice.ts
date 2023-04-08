import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
  } from "@reduxjs/toolkit";
  import ordersService from "../../services/ordersService";
  import { Order, OrdersState } from './types';
  import { RootState } from "../index";
  
  
  export const getOrders = createAsyncThunk("orders/get", async () => {
    const res = await ordersService.getAll();
    return res.data;
  });
  
  export const getOrderById = createAsyncThunk(
    "orders/getById",
    async (id: number) => {
      const res = await ordersService.get(id);
      return res.data;
    }
  );
  
  export const createOrder = createAsyncThunk("orders/create", async (data: Order) => {
    const res = await ordersService.create(data);
    return res.data;
  });
  
  export const updateOrder = createAsyncThunk(
    "orders/update",
    async ({ id, data }: any) => {
      const res = await ordersService.update(id, data);
      return res.data;
    }
  );
  
  export const deleteOrder = createAsyncThunk(
    "orders/delete",
    async ({ id }: any) => {
      await ordersService.delete(id);
      return { id };
    }
  );
  
  export const ordersAdapter = createEntityAdapter<Order>({
    selectId: (order) => order.documentNumber,
    sortComparer: (a, b) => a.documentNumber.localeCompare(b.documentNumber)
  });
  export const orderelectors = ordersAdapter.getSelectors<RootState>((state) => state.orders);
  
  
  const initialState = ordersAdapter.getInitialState<OrdersState>({
    isLoading: false,
    error: null
  });
  
  const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        ordersAdapter.setAll(state, action.payload);
      });
      builder.addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ocurrió un error consultando Tenedores';
      })
      builder.addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(createOrder.fulfilled, (state, action) => {
          state.isLoading = false;
          ordersAdapter.addOne(state, action.payload);
      });
      builder.addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ocurrió un error guardando el tenedor';
      });
      builder.addCase(updateOrder.fulfilled, (state, action) => {
        ordersAdapter.upsertOne(state, action.payload);
      })
    },
  });
  
  export const {
      selectAll: selectAllOrders,
      selectById: selectOrderById,
      selectIds: selectOrdersId
  } = ordersAdapter.getSelectors<RootState>((state) => state.orders);
  
  
  export default orderSlice.reducer;