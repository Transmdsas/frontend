import { configureStore } from '@reduxjs/toolkit';
import parameterReducer from './parameters/parameterSlice';
import valueReducer from './values/valueSlice';
import holderReducer from './holders/holderSlice';
import holderDocumentReducer from './holders/holderDocumentSlice';
import countryReducer from './countries/countrySlice';
import departmentReducer from './departments/departmentSlice';
import onwerReducer from './owners/ownerSlice';
import ownerDocumentReducer from './owners/ownerDocumentSlice';
import driverReducer from './drivers/driverSlice';
import driverContactReducer from './drivers/driverContactSlice';
import driverReferenceReducer from './drivers/driverReferenceSlice';
import driverDocumentReducer from './drivers/driverDocumentSlice';
import vehicleReducer from './vehicles/vehicleSlice';
import vehicleInspectionReducer from './vehicles/vehicleInspectionSlice';
import vehicleInsuranceReducer from './vehicles/vehicleInsuranceSlice';
import vehicleCommunicationReducer from './vehicles/vehicleCommunicationSlice';
import customerReducer from './customers/customerSlice';
import orderReducer from './orders/orderSlice';
import docsConfigReducer from './docsConfig/docConfigSlice';
import docsListReducer from './docsList/docsListSlice';


export const store = configureStore({
  reducer: {
    parameters: parameterReducer,
    values: valueReducer,
    holders: holderReducer,
    holderDocuments: holderDocumentReducer,
    drivers: driverReducer,
    driverContacts: driverContactReducer,
    driverReferences: driverReferenceReducer,
    driverDocuments: driverDocumentReducer,
    countries: countryReducer,
    departments: departmentReducer,
    owners: onwerReducer,
    ownerDocuments: ownerDocumentReducer,
    vehicles: vehicleReducer,
    vehicleInspections: vehicleInspectionReducer,
    vehicleInsurances: vehicleInsuranceReducer,
    vehicleCommunications: vehicleCommunicationReducer,
    customers: customerReducer,
    orders: orderReducer,
    docsConfig: docsConfigReducer,
    docsList: docsListReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch