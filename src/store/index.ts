import { configureStore } from '@reduxjs/toolkit';
import parameterReducer from './parameters/parameterSlice';
import valueReducer from './values/valueSlice';
import holderReducer from './holders/holderSlice';
import countryReducer from './countries/countrySlice';
import departmentReducer from './departments/departmentSlice';
import onwerReducer from './owners/ownerSlice';
import driverReducer from './drivers/driverSlice';
import vehicleReducer from './vehicles/vehicleSlice';
import customerReducer from './customers/customerSlice';
import orderReducer from './orders/orderSlice';
import docsConfigReducer from './docsConfig/docConfigSlice';
import docsListReducer from './docsList/docsListSlice';

export const store = configureStore({
  reducer: {
    parameters: parameterReducer,
    values: valueReducer,
    holders: holderReducer,
    drivers: driverReducer,
    countries: countryReducer,
    departments: departmentReducer,
    owners: onwerReducer,
    vehicles: vehicleReducer,
    customers: customerReducer,
    orders: orderReducer,
    docsConfig: docsConfigReducer,
    docsList: docsListReducer
  //  vehicles: vehicleReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch