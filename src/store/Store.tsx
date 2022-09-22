import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import {
  vehiclesReducers,
  uiReducers,
  ParametersReducers,
  currentVehicleSetUp,
} from "../reducers";
import { SteperReducer } from "../reducers/steperReducer";
import { LoadingReducer } from "../reducers/LoadingReducer";
import {} from "../reducers/currentVehicleSetUp";

const reducers = combineReducers({
  vehiclesReducers,
  ParametersReducers,
  uiReducers,
  SteperReducer,
  LoadingReducer,
  currentVehicleSetUp,
});

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
